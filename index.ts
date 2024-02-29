import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import * as User from "./services/user";
import * as Auth from "./services/auth";
import * as Jwt from "./utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import tokenHasher from "./utils/hashToken";
dotenv.config();


const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
      return;
    } else {
      next();
    }
  });
}

// ***************** Un-Protected Routes *******************


app.get(['/'], (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL,
    layout: false
  });
});



// ***************** Un-Protected EndPoints ***************



// ***************** Signin Endpoint ******************

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const { accessToken, refreshToken } = Jwt.generateTokens(user);
    await Auth.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });
    res.send({ user: user, tokens: { accessToken, refreshToken } });
  } else {
    res.send({ error: "Invalid login credentials." });
  }
})

// ******************* Sign up Endpoint *************************

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findUserByEmail(email);

  if (existingUser) {
    res.send({ error: "Email already in use" });
  } else {
    if (await User.createUser({ firstName, lastName, email, password })) {
      res.send({ success: true });
    } else {
      res.send({error: "An error occured"});
    }
  }
})

// ***************** Endpoint to verify a token ***********************

app.post("/verifyToken", async (req, res) => {
  const { token } = req.body;
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!!) as JwtPayload;
    const user = await User.findUserById(parseInt(payload.userId))
    const accessToken = Jwt.generateAccessToken(user);
    res.send({ user, tokens: { refreshToken: token, accessToken } })
  } catch (err) {
    res.send({ error: "Expired" })
    console.log(err)
  }
})

// ********** Middleware to validate the access token ***************

app.use((req, res, next) => {
  const { authorization } = req.headers;
  try {
    jwt.verify(authorization!!, process.env.JWT_ACCESS_SECRET!!);
    console.log("Access Granted")
    next();
  } catch (err) {
    console.log("Token expired")
    res.send({ error: err })
  }
})

// ************** Protected Endpoints ***************

// ************** Changing CupidCash in Account ***************
app.post("/changeCupidCash", async (req, res) => {
  const { changeAmount, userID } = req.body
  const currentValues = await User.getUserByProfile(userID)
  if (currentValues == null) {
    res.send({ error: "An error occurred with your user Profile" })
    return;
  }
  // Check if profile.balance is defined before trying to convert it
  const balanceString = currentValues?.profile?.balance?.toString();

  // Parse the balance as a float
  const balanceFloat = parseFloat(balanceString || '0');
  const newBalance = balanceFloat + changeAmount
  if (newBalance < 0) {
    res.send({ error: "You are spending too much money" });
    return;
  }
  await User.updateUserBalance(userID, newBalance)

  // Handle success, send response, etc.
  res.send({ message: "Balance updated successfully", newBalance: newBalance });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


