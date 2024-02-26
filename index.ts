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
  const {email, password} = req.body;
  const existingUser = await User.findUserByEmail(email);

  if (!existingUser) {
    res.send({error: "Invalid login credentials."});
    return;
  }
  bcrypt.compare(password, existingUser.password, async (err, result) => {
    if (!result) {
      res.send({ error: "Invalid login credentials." });
    } else {
      const jti = uuid();
      const { accessToken, refreshToken } = Jwt.generateTokens(existingUser, jti);
      const hashToken = await Auth.addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });
      res.send({user: existingUser, tokens: {accessToken, refreshToken, hashToken}}); 
    }
  })
})

// ***************** Sign in With Token Endpoint *****************

app.post("/signinwithtoken", async (req, res) => {
  
  const {refreshToken, id} = req.body;
  if (!refreshToken) {
    res.send({error: "Access Denied"})
    return;
  }
  const token = await Auth.findRefreshTokenById(id);
  if (!token) {
    res.send({error: "Access Denied"})
    return;
  }
  // Need to look at expired refresh tokens here
  // Current authentication is always given
  const user = await User.findUserById(token.userId);
  if (!user) {
    res.send({error: "Access Denied"})
    return;
  }
  
  const jti = uuid();
  const tokens = Jwt.generateTokens(user, jti);
  const newRefresh = tokens.refreshToken;
  const newAccess = tokens.accessToken;
  const hashToken = await Auth.addRefreshTokenToWhitelist({ jti, refreshToken: tokens.refreshToken, userId: user.id });
  res.send({user, tokens: {accessToken: newAccess, refreshToken: newRefresh, hashToken}});
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
  const jti = uuid();
  const { accessToken, refreshToken } = Jwt.generateTokens(user, jti);
  await Auth.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
  res.send({success: true});
})



// ************** End point to refresh the access token *************

app.post("/refreshToken", async (req, res) => {
  const {user, refreshToken} = req.body;

  if (!user || !refreshToken) {
    res.send({error: "Access Denied"})
    return;
  }

  if (await !Auth.findRefreshTokenById(refreshToken)) {
    res.send({error: "Access Denied"})
    return;
  }

  const newToken = Jwt.generateAccessToken(user);
  
  const jti = uuid();
  const hashToken = await Auth.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
  console.log("New Token Generated!");

  res.send({tokens: {accessToken: newToken, refreshToken, hashToken}});
})

// ************** Protected Routes ************************

app.use(["/home", "/aiAssistance", "/aiChat", "/selectCupid", "/myAccount", "/cupidCash", "/purchases"], (req, res, next) => {
  const authorization = req.headers;
  if (!authorization.host) next();
  res.redirect("/");
  return;
})

// ********** Middleware to validate the access token ***************

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
})

// ************** Protected Endpoints ***************



app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


