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

// const config = {

//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET_AUTH,
//   baseURL: "http://localhost:3001", //process.env.BASE_URL_AUTH,
//   clientID: "UyoWNVOewL3AwKDm9dVH32NftqztgdVH",
//   issuerBaseURL: "https://dev-nxuk8wmn.us.auth0.com",
// };

//!XXX AGregar esto que es una copia del otro repo que es el que funciona
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: "srKuo1tEHJhLA3PIvS9qi74BDsQ65r5pTPnDIkX1qKkQSTXy66S5zrDokUERkNYn", //process.env.SECRET
//   baseURL: "http://localhost:3001", //cambié esto de 3001 a 3000 y me parece que no fue bueno
//   clientID: "RVXfWxKNxYtQugjUSybTmxylkJfrHzUc",
//   issuerBaseURL: "https://dev-nxuk8wmn.us.auth0.com",
// };
//!------------------------

// var jwt = require("express-jwt");
const { expressjwt: jwt } = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-nxuk8wmn.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://juka-production.up.railway.app/",
  issuer: "https://dev-nxuk8wmn.us.auth0.com/",
  algorithms: ["RS256"],
});

// app.use(jwtCheck);

var corsOptions = {
  origin: [
    "https://mascotapps.vercel.app",
    "http://localhost:3000",
    "http://localhost:3000/home",
    "https://checkout.stripe.com",
    "https://dev-nxuk8wmn.us.auth0.com",
    "http://localhost:3001",
  ],
  headers: "*",
  methods: "*",
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(cors()); //! XXX COMENTAR no dif.. 4
//!-- cookie y headers problem:
//! adicionales para CORS problem y cookies headers:
// const cookieParser = require("cookie-parser");  //! XXX COMENTAR TODO esto 4
// app.use(cookieParser()); //! cookie problem
// app.use((_, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   return next();
// });

app.use(express.urlencoded({ extended: true }));

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

app.get("/testauth", jwtCheck, async (req: any, res) => {
  console.log(`entré a /TESTAUTH`);
  try {
    console.log("REQ : ");
    console.log(req.user);
    console.log(req.auth);
    console.log(req.auth?.sub);

    // let userInDB = await db.User.findByPk(req.oidc.user.sub);
    // if (!userInDB) {
    //   let reqUser: any = req.oidc.user;
    //   let newUser = await db.User.create({
    //     email: reqUser.email,
    //     id: reqUser.sub,
    //     name: reqUser.name,
    //     image: reqUser.picture,
    //   });
    //   console.log("NEW USER: ");
    //   console.log(newUser);
    //   return res.status(200).send(newUser);
    // } else {
    //   console.log("Usuario encontrado en la DB! :");
    return res.status(200).send("RECIBIDOO!!");
  } catch (error: any) {
    console.log(`error! ${error.message}`);
  }
});

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
