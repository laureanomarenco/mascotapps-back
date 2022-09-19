import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import checkoutRouter from "./routes/checkout";
import db from "../models";
import { visitor } from "./types/visitorTypes";

//! ---- nuevo para passport:
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("../config/passport-setup");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../config/config.js")[env];
const cookieSession = require("cookie-session");
const passport = require("passport");
//!---fin nuevo para passport ----

// import db from "./src/models";
const app = express();
//const Stripe = require('stripe')
//export const stripe = new Stripe("sk_test_51LhyryGUTOi474cy1H3QDqeKpzGNU83MUMej4yzD3Rr4K7o0EonNQkpgN51HTb12T4p0tq4Uzx5KFN6scOdrAJEX00PdF4emQp")

//const cors = require('cors')

app.use(express.json()); // middleware que transforma la req.body a un json

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

//ruta para testear que responde la api:
app.get("/ping", (_req, res) => {
  // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
  console.log("Someone pinged here!!!");
  res.send("pong");
});

//! set up view engine. No debería estar, pero lo pongo para testeos provisorios:
app.set("view engine", "ejs");

// middlewares para encriptar la cookie que voy a enviar al browser:

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 45, // === 45 minutos
    keys: [config.cookieKey],
  })
);


//Inicializar passport:
app.use(passport.initialize());
app.use(passport.session());

// RUTAS:
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/checkout", checkoutRouter);

app.get("/", async (req: any, res) => {
  console.log("ENTRÉ AL GET DE '/' y el req.user es " + req.user);
  try {
    let newVisitor: visitor = {
      id: undefined
    }
    let newVisit = await db.Visitor.create(newVisitor)
    res.send(req.user)
  } catch (error) {
    res.status(404).send(error)
  }
  //res.render("home", { usuario: req.user });
});


module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
