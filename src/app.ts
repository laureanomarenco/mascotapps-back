//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "../../config/config.js")[env];

import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import checkoutRouter from "./routes/checkout";
// import db from "../models";
// import { visitor } from "./types/visitorTypes";
// import { validateNewUser } from "./auxiliary/UserValidators";
// import { UserAttributes } from "./types/userTypes";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

var corsOptions = {
  origin: ["https://mascotapps.vercel.app","http://localhost:3000"],
  credentials: true
  }

app.use(cors(corsOptions));

//app.set("trust proxy", 1);

// ruta para testear que responde la api:
// app.get("/ping", (_req, res) => {
//   // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
//   console.log("Someone pinged here!!!");
//   res.send("pong");
// });

// RUTAS:

app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/checkout", checkoutRouter);

//! falta que del front hagan un get a esta ruta cada vez que alguien pasa por su lading page. Voy a comentarla ahora para probar passport. Pero habría que mover esta ruta a otra ruta más específica y que desde el front le tiren GETs cada vez que se monta el landing por ejemplo.
// app.get("/", async (req: any, res) => {
//   console.log("ENTRÉ AL GET DE '/' y el req.user es " + req.user);
//   try {
//     let newVisitor: visitor = {
//       id: undefined,
//     };
//     let newVisit = await db.Visitor.create(newVisitor);
//     // res.send(req.user);
//   } catch (error) {
//     res.status(404).send(error);
//   }
//   //res.render("home", { usuario: req.user });
// });

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
