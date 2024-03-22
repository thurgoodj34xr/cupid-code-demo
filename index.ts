import { PrismaClient, User } from "@prisma/client";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import path from "path";
import AdminController from "./server/controllers/admin_controller";
import CupidController from "./server/controllers/cupid_controller";
import NotificationController from "./server/controllers/notification_controller";
import ProfileController from "./server/controllers/profile_controller";
import PurchasesController from "./server/controllers/purchases_controller";
import TokenController from "./server/controllers/token_controller";
import UserController from "./server/controllers/user_controller";
import { createServer } from "node:http";
import { Server } from "socket.io"
import "./global";
import HireCupidController from "./server/controllers/hire_cupid_controller";
import JobsController from "./server/controllers/jobs_controller";
dotenv.config();

const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())
const db = new PrismaClient();

const app = express();
const server = createServer(app);
const io = new Server(server);
export default io;

let users: User[] = []
io.on('connection', (socket) => {
  let user: User;

  socket.on("user", (data: User) => {
    if (!user) {
      user = data;
      users = [...users, data]
      io.emit("count", users)
    } else {
      const newUsers = users.filter((u) => u.id !== user.id)
      users = [...newUsers, data]
      user = data;
    }
  })

  socket.on("log", (data) => {
    logInfo(data.file, data.message, data.user);
    socket.emit("count", users)
  })

  socket.on("getCount", () => {
    io.emit("count", users)
  })

  socket.on("signOut", (data) => {
    logInfo(data.file, data.message, data.user);
    const newUsers = users.filter((u) => u.id !== user.id)
    users = newUsers;
    io.emit("count", users)
  })

  socket.on("disconnect", () => {
    if (user) {
      const newUsers = users.filter((u) => u.id !== user.id)
      users = newUsers;
      io.emit("count", users)
    }
  })
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  // logInfo(`index.ts`, `${req.method} ${req.url}`);
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
app.use("/hireCupid", HireCupidController(db))
app.use("/jobs", JobsController(db))


server.listen(process.env.PORT || 3000, () => {
  logInfo(`Index.ts`, `Listening on port ${process.env.PORT || 3000}...`)
});


