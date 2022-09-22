import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import checkoutRouter from "./routes/checkout";
// import db from "../models";
// import { visitor } from "./types/visitorTypes";

//! ---- nuevo para passport:
// const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
// const passportSetup = require("../config/passport-setup");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../config/config.js")[env];
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
// const expressSession = require("express-session");
// const passport = require("passport");
// const { SESSION_COOKIE_KEY } = process.env;
//!---fin nuevo para passport ----
//!-- video nuevo: --
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
// import { validateNewUser } from "./auxiliary/UserValidators";
// import { UserAttributes } from "./types/userTypes";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GitHubStrategy = require("passport-github").Strategy;

dotenv.config();
//!--------------
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json

var corsOptions = {
  origin: [
    "https://mascotapps.vercel.app",
    "http://localhost:3000",
    "https://mascotapps-front-pass-mb57.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "LaSesionEnMascotapps",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["unaKeyParaLaSession"],
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
import passport from "../config/pass-setup";

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Corre este callback y se va a serializar el usuario.
app.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "https://mascotapps-front-pass-mb57.vercel.app/",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://mascotapps-front-pass-mb57.vercel.app/home"); //homepage de la aplicación en React.
  }
);

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

//!-------

//! middlewares para encriptar la cookie que voy a enviar al browser:
//! NO LA USAMOS A ESTA? SE REEMPLAZA POR SESSION?

// RUTAS:
// app.use("/auth", authRoutes); //! comento esta para que no moleste
app.use("/profile", profileRoutes);
app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/checkout", checkoutRouter);

//! falta que del front hagan un get a esta ruta cada vez que alguien pasa por su lading page. Voy a comentarla ahora para probar passport. Pero habría que mover esta ruta a otra ruta más específica y que desde el front le tiren GETs cada vez que se monta el landing por ejemplo.
app.get("/", async (req: any, res) => {
  console.log("ENTRÉ AL GET DE '/' y el req.user es " + req.user);
});

app.get("/auth/logout", (req: any, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
});

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
