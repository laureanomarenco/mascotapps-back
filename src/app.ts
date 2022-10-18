const morgan = require("morgan");
import express from "express";
import usersRouter from "./routes/user/user-Routes";
import animalRouter from "./routes/pet/pet-Routes";
import checkoutRouter from "./routes/checkout/checkout-Routes";
import visitor from "./routes/visitor/visitor-Routes";
import transactionsRouter from "./routes/transaction/transaction-Routes";
import reviewsRouter from "./routes/review/review-Routes";
import commentRouter from "./routes/comment/comment-Routes";
import adminRouter from "./routes/admin/admin-Routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

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

var corsOptions = {
  origin: [
    "https://mascotapps.vercel.app/",
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

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
