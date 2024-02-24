import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import * as User from "./services/user";
import * as Auth from "./services/auth";
import * as Jwt from "./utils/jwt";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import db from "./utils/prisma";
import bcrypt from "bcryptjs";
import { tokenToString } from "typescript";
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
    } else {
      next();
    }
  });
}

app.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  const existingUser = await User.findUserByEmail(email);

  if (!existingUser) {
    res.send({error: "Invalid login credentials."});
    return;
  }
  bcrypt.compare(password, existingUser.password, (err, result) => {
    if (err || !result) {
      res.send({ error: "Invalid login credentials." });
      return;
    }
  })
  const jti = uuid();
  const { accessToken, refreshToken } = Jwt.generateTokens(existingUser, jti);
  await Auth.addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });
  res.send({user: existingUser, tokens: {accessToken, refreshToken}}); 
})

app.post("/signinwithtoken", async (req, res) => {
  const {refreshToken} = req.body;
  if (!refreshToken) {
    res.send({error: "Access Denied"})
    return;
  }
  
  console.log(refreshToken);
  const token = await Auth.findRefreshTokenById(refreshToken);
  console.log(token)
  if (!token) {
    res.send({error: "Access Denied"})
    return;
  }
  const user = await User.findUserById(token.userId);
  if (!user) {
    res.send({error: "Access Denied"})
    return;
  }
  console.log(user);
})

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findUserByEmail(email);

  if (existingUser) {
    res.send({error: "Email already in use"});
    return;
  }

  const user = await User.createUser({firstName, lastName, email, password});
  const jti = uuid();
  const { accessToken, refreshToken } = Jwt.generateTokens(user, jti);
  await Auth.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
  res.send({success: true});
})

app.get(['/'], (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL,
    layout: false
  });
});



// These are protectded routes and jwt is required

// First need a way to refresh the access token
app.post("/refreshToken", async (req, res) => {
  const {user, refreshToken} = req.body;
  if (!user || !refreshToken) {
    res.send({error: "Access Denied"})
    return;
  }
  console.log(refreshToken)
  if (await !Auth.findRefreshTokenById(refreshToken)) {
    res.send({error: "Access Denied"})
    return;
  }

  const newToken = Jwt.generateAccessToken(user);
  const jti = uuid();
  
  await Auth.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
  console.log("New Token Generated!");
  res.send({accessToken: newToken});
})

// Now we can check if the request has a valid access token

app.use((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.send({error: "Un-Authorized"})
  }
  try {
    const token = authorization;
    if (!token) return;
    if (!process.env.JWT_ACCESS_SECRET) return;
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log("Access Granted")
    next();
  } catch (err) {
    console.log("Token expired")
    res.send({error: err})
    return;
  }
});

let n=0;
app.get("/number", (req,res) => {
  n += 1;
  res.send({number: n})
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


