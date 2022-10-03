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
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

// var jwt = require("express-jwt");
const { expressjwt: jwt } = require("express-jwt");
var jwks = require("jwks-rsa");

const jwtCheck = jwt({
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

app.get("/testauth", jwtCheck, async (req: any, res) => {
  console.log(`entré a /TESTAUTH`);
  try {
    console.log("REQ : ");
    console.log(req.user);
    console.log(req.auth);
    console.log(req.auth?.sub);
    return res.status(200).send("RECIBIDOO!!");
  } catch (error: any) {
    console.log(`error! ${error.message}`);
  }
});

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
