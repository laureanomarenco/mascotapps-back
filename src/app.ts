//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "../../config/config.js")[env];

import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import checkoutRouter from "./routes/checkout";
import visitor from "./routes/visitor";
import transactionsRouter from "./routes/transaction";
import reviewsRouter from "./routes/review";

import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());

// var corsOptions = {
//   origin: ["https://mascotapps.vercel.app", "http://localhost:3000"],
//   headers: "*", 
//   methods: "*",
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// RUTAS:
app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/checkout", checkoutRouter);
app.use("/visitor", visitor);
app.use("/reviews", reviewsRouter);
app.use("/transactions", transactionsRouter);
//! falta que del front hagan un get a esta ruta cada vez que alguien pasa por su lading page. Voy a comentarla ahora para probar passport. Pero habría que mover esta ruta a otra ruta más específica y que desde el front le tiren GETs cada vez que se monta el landing por ejemplo.

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
