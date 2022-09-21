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
//const cookieSession = require("cookie-session");
//const cookieParser = require("cookie-parser");
// const expressSession = require("express-session");
const passport = require("passport");
// const { SESSION_COOKIE_KEY } = process.env;
//!---fin nuevo para passport ----
//!-- video nuevo: --
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { validateNewUser } from "./auxiliary/UserValidators";
import { UserAttributes } from "./types/userTypes";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GitHubStrategy = require("passport-github").Strategy;

dotenv.config();
//!--------------
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json

var corsOptions = {
  origin: ["https://mascotapps.vercel.app","http://localhost:3000"],
  credentials: true
  }

app.use(cors(corsOptions));

app.set("trust proxy", 1);

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
app.use(passport.initialize());
app.use(passport.session());

//4: Serializa el usuario. El user que recibe como argumento el serialize es el "newUser" que se crea (o encuntra) en la callback function de la estrategia.
passport.serializeUser((user: any, done: any) => {
  return done(null, user.id);
});

// Cada vez que tengamos una req, vamos a agarrar la cookie y deserializarla:
// Llega el id que acabo de meter en el done(null, user._id) del serializeUser
passport.deserializeUser(async (id: string, done: any) => {
  let userFound = await db.User.findByPk(id);

  return done(null, userFound);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/redirect",
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      console.log(`GoogleStrategy callback disparada...`);
      console.log(`Soy el profile:`);
      console.log(profile);
      try {
        //esta función corre cuando hay una autenticación exitosa!
        //Las funciones cb() lo que hacen es decirle a Passport "to move on and go to the next step". Le pasamos algunos params para el próximo paso también.
        let userInDB = await db.User.findOne({
          where: {
            googleId: profile.id,
          },
        });
        if (!userInDB) {
          console.log(`User in DB no encontrado. Creando uno nuevo...`);
          let validatedUser: UserAttributes = validateNewUser(profile);
          console.log("usuario validado correctamente y listo para crearse...");
          let createdUser = await db.User.create(validatedUser);
          console.log(`Nuevo usuario creado: `);
          console.log(createdUser);
          cb(null, createdUser);
        } else {
          cb(null, userInDB);
        }
      } catch (error: any) {
        console.log(`Error en el Google Stgy callback: ${error.message}`);
        return error.message;
      }
    }
  )
);

// 1: Cuando el usuario hace un get a /auth/google va a ir al paso 2 a correr la googleStrategy.
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//3: Corre este callback y se va a serializar el usuario.
app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://mascotapps.vercel.app/home"); //homepage de la aplicación en React.
  }
);

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

//!-------
// app.use((req, res, next) => {
//   var allowedDomains = [
//     "http://localhost:3000",
//     "https://mascotapps.vercel.app",
//   ];
//   const origin: any = req.headers.origin;
//   if (allowedDomains.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
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

//ruta para testear que responde la api:
// app.get("/ping", (_req, res) => {
//   // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
//   console.log("Someone pinged here!!!");
//   res.send("pong");
// });

// middlewares para encriptar la cookie que voy a enviar al browser:

// app.use(
//   cookieSession({
//     name: "LaSesionEnMascotapps",
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [SESSION_COOKIE_KEY],
//   })
// );

// RUTAS:
// app.use("/auth", authRoutes); //! comento esta para que no moleste
app.use("/profile", profileRoutes);
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

app.get("/auth/logout", (req: any, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
})

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
