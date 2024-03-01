import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import * as User from "./services/user";
import * as Auth from "./services/auth";
import * as Purchases from "./services/purchases";
import * as Jwt from "./utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import tokenHasher from "./utils/hashToken";
import { Decimal } from "@prisma/client/runtime/library";
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
  const { userType, firstName, lastName, email, password, age, budget, goals, } = req.body;
  const existingUser = await User.findUserByEmail(email);

  if (existingUser) {
    res.send({ error: "Email already in use" });
    return;
  }

  switch (userType) {
    case 'Standard':
      if (await User.createUser({ firstName, lastName, email, password, age, budget, goals })) {
        res.send({ success: true });
      } else {
        res.send({ error: "An error occured" });
      }
      break;
    default:
      res.send({ error: "Invalid user type" })
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
  const { changeAmount, userId } = req.body
  try {
    const user = await User.findUserById(userId);
    const currentBalance = user!!.profile!!.balance.toNumber();
    var workingChangeAmount = Math.abs(changeAmount)
    const newBalance = currentBalance + workingChangeAmount;
    if (newBalance < 0) {
      res.send({ error: "Cannot Spend more money then you have!" })
      return;
    }
    await User.updateUserBalance(userId, newBalance)
    await Purchases.recordPurchase(userId, null, workingChangeAmount, 0, 0, workingChangeAmount, "Cupid Bucks Purchase")
    res.send({ newBalance });
    return;
  } catch (error) {
    console.log({ error })
    res.send({ error: "Access Denied" })
    return;
  }
});

// ************** Record Purchase ***************
app.post("/recordPurchase", async (req, res) => {
  const { userId, cupidId, total, jobCost, details } = req.body
  try {
    var workingTotal = Math.abs(total)
    var workingJobCost = Math.abs(jobCost)
    const user = await User.findUserById(userId);
    const currentBalance = user!!.profile!!.balance.toNumber();
    const newBalance = currentBalance - workingTotal;
    if (newBalance < 0) {
      res.send({ error: "Cannot Spend more money then you have!" })
      return;
    }
    await User.updateUserBalance(userId, newBalance)
    const cupidPayout = (workingTotal - workingJobCost) * .6
    const profit = (workingTotal - workingJobCost) * .4
    var purchase = await Purchases.recordPurchase(userId, cupidId, workingTotal, workingJobCost, cupidPayout, profit, details)
    res.send({ message: "Purchase successfully completed", purchase, newBalance: newBalance })
    return;
  } catch (error) {
    console.log({ error })
    res.send({ error: "Access Denied" })
  }
});

// ************** Record Purchase ***************
app.post("/getPurchaseHistory", async (req, res) => {
  const { userId } = req.body
  const purchases = await Purchases.findAllByUserId(userId)
  res.send({ purchases })
  return;
});

// ************** Record Purchase ***************
app.post("/getPurchaseHistory", async (req, res) => {
  const { userId } = req.body
  const purchases = await Purchases.findAllByUserId(userId)
  res.send({ purchases })
  return;
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


