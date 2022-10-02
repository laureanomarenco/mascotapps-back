//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "../../config/config.js")[env];
import db from "../models/index";
import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import checkoutRouter from "./routes/checkout";
import visitor from "./routes/visitor";
import transactionsRouter from "./routes/transaction";
import reviewsRouter from "./routes/review";
import commentRouter from "./routes/comment";
import adminRouter from "./routes/admin";
import { requiresAuth } from "express-openid-connect"; //! auth0

import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_AUTH,
  baseURL: process.env.BASE_URL_AUTH,
  clientID: process.env.CLIENT_ID_AUTH,
  issuerBaseURL: process.env.ISSUER_AUTH,
};

var corsOptions = {
  origin: [
    "https://mascotapps.vercel.app",
    "http://localhost:3000",
    "https://checkout.stripe.com",
    "https://dev-nxuk8wmn.us.auth0.com",
  ],
  headers: "*",
  methods: "*",
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// RUTAS:
app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/checkout", checkoutRouter);
app.use("/visitor", visitor);
app.use("/reviews", reviewsRouter);
app.use("/transactions", transactionsRouter);
app.use("/comments", commentRouter);
app.use("/admin", adminRouter);

//! rutas de prueba:

app.get("/callback", (req, res) => {
  console.log(`pasé por /callback. Redirigiendo a vercel/home`);
  try {
    // res.header();
    res.redirect("https://mascotapps.vercel.app/home");
  } catch (error) {
    console.log(`Error en /callback`);
  }
});

app.get("/testauth", requiresAuth(), async (req: any, res) => {
  console.log(`entré a auth/getuserinfo`);
  try {
    console.log(req.oidc);
    console.log("REQ.OIDC.USER : ");
    console.log(req.oidc.user);
    let userInDB = await db.User.findByPk(req.oidc.user.sub);
    if (!userInDB) {
      let reqUser: any = req.oidc.user;
      let newUser = await db.User.create({
        email: reqUser.email,
        id: reqUser.sub,
        name: reqUser.name,
        image: reqUser.picture,
      });
      console.log("NEW USER: ");
      console.log(newUser);
      return res.status(200).send(newUser);
    } else {
      console.log("Usuario encontrado en la DB! :");
      return res.status(200).send(userInDB);
    }
  } catch (error: any) {
    console.log(`error! ${error.message}`);
  }
});

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
