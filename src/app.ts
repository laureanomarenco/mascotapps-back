import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import checkoutRouter from "./routes/checkout";
import db from "../models";
// import { visitor } from "./types/visitorTypes";

//! ---- nuevo para passport:
// const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
// const passportSetup = require("../config/passport-setup");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../config/config.js")[env];
const cookieSession = require("cookie-session");

// const passport = require("passport");
// const { SESSION_COOKIE_KEY } = process.env;
//!---fin nuevo para passport ----
//!-- video nuevo: --
import dotenv from "dotenv";
import cors from "cors";
// import { validateNewUser } from "./auxiliary/UserValidators";
// import { UserAttributes } from "./types/userTypes";
require("../config/pass-setup");
dotenv.config();
//!--------------
const app = express();
const Sequelize = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//este db.sequelize está bien o será sólo sequelize?
sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

function extendDefaultFields(
  defaults: { data: any; expires: any },
  session: { userId: any }
) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
  };
}

var sessionStore = new SequelizeStore({
  db: sequelize,
  table: "Session",
  extendDefaultFields: extendDefaultFields,
});
sessionStore.sync();

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUnitialized: true,
    store: sessionStore,
    // store: new SequelizeStore({
    //   db: sequelize,
    // }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

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

// app.use(
//   session({
//     secret: "secretcode",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: "none",
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );
import passport from "../config/pass-setup";
import { MemoryStore } from "express-session";

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
