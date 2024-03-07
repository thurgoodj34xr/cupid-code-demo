import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import path from "path";
import CupidController from "./server/controllers/cupid_controller";
import NotificationController from "./server/controllers/notification_controller";
import PurchasesController from "./server/controllers/purchases_controller";
import TokenController from "./server/controllers/token_controller";
import UserController from "./server/controllers/user_controller";
import ProfileController from "./server/controllers/profile_controller";
import AdminController from "./server/controllers/admin_controller";
dotenv.config();


const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())
const db = new PrismaClient();

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  if (req.url.includes("/images")) {
    res.sendFile(path.join(__dirname, req.url).replace("%20", " "));
  } else {
    next();
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

app.get(['/'], (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL,
    layout: false
  });
});

app.use("/users", UserController(db))
app.use("/profile", ProfileController(db))
app.use("/cupids", CupidController(db))
app.use("/token", TokenController(db))
app.use("/notifications", NotificationController(db))
app.use("/purchases", PurchasesController(db))
app.use("/admin", AdminController(db))


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


