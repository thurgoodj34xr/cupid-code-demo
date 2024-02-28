import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import * as User from "./services/user";
import * as Auth from "./services/auth";
import * as Jwt from "./utils/jwt";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
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

let ct = 0;
app.post("/number", (req,res) => {
  const {inc} = req.body;
  ct += inc
  res.send({ct});
})



// ***************** Signin Endpoint ******************

app.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
      const { accessToken, refreshToken } = Jwt.generateTokens(user);
      await Auth.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });
      res.send({user: user, tokens: {accessToken, refreshToken}});
  } else {
    res.send({ error: "Invalid login credentials." });
  }
})

// ******************* Sign up Endpoint *************************

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findUserByEmail(email);

  if (existingUser) {
    res.send({error: "Email already in use"});
    return;
  }

  const user = await User.createUser({firstName, lastName, email, password});
  const { refreshToken } = Jwt.generateTokens(user);
  await Auth.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });
  res.send({success: true});
})

// ***************** Endpoint to verify a token ***********************

app.post("/verifyToken", async (req, res) => {
  const {token} = req.body;
  try {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET!!);
  } catch (err) {
    res.send({error: "Expired"})
    return;
  }
  
  const user = await Auth.findUserByToken(tokenHasher(token))

  const accessToken = Jwt.generateAccessToken(user);
  if (!user) {
    res.send({error: "Invalid Token"})
  } else {
    res.send({user, tokens: {refreshToken: token, accessToken}})
  }
})



// ************** End point to refresh the access token *************

app.post("/refreshToken", async (req, res) => {
  const {user, refreshToken} = req.body;

  if (await !Auth.findRefreshTokenById(refreshToken)) {
    res.send({error: "Access Denied"})
    return;
  }
  const newToken = Jwt.generateAccessToken(user);
  await Auth.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });
  res.send({tokens: {accessToken: newToken, refreshToken}});
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
    res.send({error: err})
  }
})

// ************** Protected Endpoints ***************



app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


