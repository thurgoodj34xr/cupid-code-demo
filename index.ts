import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import multer from "multer";
import path from "path";
import * as Auth from "./services/auth";
import * as Notifications from "./services/notifications";
import * as Purchases from "./services/purchases";
import * as User from "./services/user";
import { isStrongPassword } from "./utils/isStrongPassword";
import { NotificationType } from "@prisma/client";
import * as Jwt from "./utils/jwt";
import * as Cupid from "./services/cupid"
import UserController from "./src/controllers/user_controller";
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

app.get("/cupids", async (req, res) => {
  const cupids = await Cupid.getAll();
  res.send({ cupids })
})

// ************** Adding CupidCash in Account ***************
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

// ************** Get Purchase History ***************
app.post("/getPurchaseHistory", async (req, res) => {
  const { userId } = req.body
  const purchases = await Purchases.findAllByUserId(userId)
  res.send({ purchases })
  return;
});

// ************** Record Notification ***************
app.post("/recordNotification", async (req, res) => {
  const { userId, title, message, notificationType } = req.body
  if (notificationType == NotificationType.ALL) {
    res.send({ error: "You cannot create a notification type ALL" })
  }
  const notification = await Notifications.recordNotification(userId, title, message, notificationType)
  res.send({ message: "Your message was sent", notification })
  return;
});

// ************** Get All Notifications for User ***************
app.post("/getNotificationHistory", async (req, res) => {
  const { userId, notificationType } = req.body
  var notifications = null;
  if (notificationType == NotificationType.ALL) {
    notifications = await Notifications.findAllByUserId(userId)
  } else {
    notifications = await Notifications.findAllByUserIdWithType(userId, notificationType)
  }
  res.send({ notifications })
  return;
});

// ************** Delete Specific Notification ***************
app.post("/deleteNotification", async (req, res) => {
  const { notificationId } = req.body
  const notification = await Notifications.deleteNotification(notificationId)
  res.send({ notification })
  return;
});

// ************** Update User Account ***************
app.post("/updateProfile", async (req, res) => {
  const { userId, firstName, lastName, email, age, dailyBudget, relationshipGoals } = req.body
  var workingAge = parseInt(age)
  var workingBudget = parseFloat(dailyBudget)

  // Validate Numbers
  if (isNaN(workingAge)) {
    res.send({ error: "Age must be a number" })
    return;
  }

  if (isNaN(workingBudget)) {
    res.send({ error: "Budget must be a number" });
    return;
  }

  // Check Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.send({ error: "Invalid Email Provided" })
    return;
  }
  // Check Budget
  if (workingBudget < 10 && workingBudget != 0) {
    res.send({ error: "In order to service quality dates, Cupid Code requires a minimum of 10 cupid bucks per date" })
    return;
  }
  // Check Age
  if (workingAge < 18 && workingAge != 0) {
    res.send({ error: "To use this service you must be at least 18" })
    return;
  }
  const updatedAccount = await User.updateUserAccount(userId, firstName, lastName, email, workingAge, workingBudget, relationshipGoals)
  res.send({ message: "Your account was successfully updated", updatedAccount })
  return;
});

// ************** Update User Password ***************
app.post("/updatePassword", async (req, res) => {
  const { userId, currentPassword, newPassword, repeatNew } = req.body
  const user = await User.findUserById(userId);

  if (newPassword !== repeatNew) {
    res.send({ error: "New password fields don't match" })
    return;
  }
  if (newPassword === currentPassword) {
    res.send({ error: "New password can't be old password" })
    return;
  }
  const resultOfStrongCheck = isStrongPassword(newPassword)
  if (!resultOfStrongCheck.success) {
    res.send({ error: resultOfStrongCheck.message })
    return;
  }

  if (user && bcrypt.compareSync(currentPassword, user.password)) {
    const profile = await User.updateUserPassword(userId, newPassword)
    res.send({ message: "Your account was successfully updated", profile })
    return;
  } else {
    res.send({ error: "Incorrect Current Password." });
    return;
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


