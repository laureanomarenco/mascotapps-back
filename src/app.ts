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

const cors = require("cors");

app.use(express.json()); // middleware que transforma la req.body a un json
// //!comenté el app.use() de acá abajo para darle lugar al otro de más abajo para CORS.
// app.use(cors());
// // app.use(cors({ credentials: true, origin: true, exposedHeaders: "*" }));
// app.use((_req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   next();
// });
app.use(
  cors({
    origin: "https://mascotapps.vercel.app",
    credentials: true,
  })
);
//!_---
// app.use(function (req, res, next) {
//   var allowedDomains: string[] = [
//     "https://mascotapps.vercel.app/",
//     "https://accounts.google.com",
//   ];
//   var origin: any = req.headers.origin;
//   if (allowedDomains.indexOf(origin) > -1) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   next();
// });

//!--------- probando CORS: ----
// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "https://mascotapps.vercel.app",
//     "https://accounts.google.com",
//     "www.example3.com",
//   ];
//   const origin: any = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   console.log("PASÉ POR EL APP.USE DE CORS");

//   next();
// });
//!--------------------------------------

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
    name: "LaSesionEnMascotapps",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["lakeyparahashear"],
  })
);

//Inicializar passport:
app.use(passport.initialize());
app.use(passport.session());

//!vuelvo a agregar cors abajo de el tema de las cookies o lo que se que haga acá arriba: NUEVO
app.use(
  cors({
    origin: "https://mascotapps.vercel.app",
    credentials: true,
  })
);
// RUTAS:
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/checkout", checkoutRouter);

//! falta que del front hagan un get a esta ruta cada vez que alguien pasa por su lading page. Voy a comentarla ahora para probar passport. Pero habría que mover esta ruta a otra ruta más específica y que desde el front le tiren GETs cada vez que se monta el landing por ejemplo.
app.get("/", async (req: any, res) => {
  console.log("ENTRÉ AL GET DE '/' y el req.user es " + req.user);
  try {
    let newVisitor: visitor = {
      id: undefined,
    };
    let newVisit = await db.Visitor.create(newVisitor);
    // res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
  //res.render("home", { usuario: req.user });
});

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
