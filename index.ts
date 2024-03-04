import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";
import UserController from "./src/controllers/user_controller";
import TokenController from "./src/controllers/token_controller";
import CupidController from "./src/controllers/cupid_controller";
import NotificationController from "./src/controllers/notification_controller";
import PurchasesController from "./src/controllers/purchases_controller";
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
  if (req.url.includes("/Images")) {
    res.sendFile(path.join(__dirname, req.url).replace("%20", " "));
  } else {
    next()
  }
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

app.use("/users", UserController())

// ******************* Sign up Endpoint *************************



// ***************** Endpoint to verify a token ***********************

app.use("/token", TokenController())

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
app.use("/cupids", CupidController())
app.use("/notifications", NotificationController())
app.use("/purchases", PurchasesController())


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


