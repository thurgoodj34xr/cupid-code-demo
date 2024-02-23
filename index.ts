import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./utils/prisma";
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
    } else {
      next();
    }
  });
}

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const ct = await db.user.count({
    where: {
      email
    },
  });

  if (ct == 0) {
    res.send({ error: "Invalid Email/Password combo" });
    return;
  }

  const user = await db.user.findFirst({
    where: {
      email
    },
  });
  console.log(user)

  if (user == null) {
    res.send({ error: "Invalid Email/Password combo" });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      res.send({ error: "Invalid Email/Password combo" });
      return;
    }
    // Password matches, send user response
    res.send(user)
    return;
  })
})

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let ct = await db.user.count({
    where: {
      email
    },
  });

  if (ct > 0) {
    res.send({ error: "Email already exists" })
    return;
  }
  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password),
      profile: {}
    }
  });
  res.send(user)
})

app.get(["/", "/sign_up", '/home'], (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL,
    layout: false
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


