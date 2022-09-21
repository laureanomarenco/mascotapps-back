"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const pets_1 = __importDefault(require("./routes/pets"));
const checkout_1 = __importDefault(require("./routes/checkout"));
// import db from "../models";
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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
// import { validateNewUser } from "./auxiliary/UserValidators";
// import { UserAttributes } from "./types/userTypes";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GitHubStrategy = require("passport-github").Strategy;
dotenv_1.default.config();
//!--------------
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
var corsOptions = {
    origin: [
        "https://mascotapps.vercel.app",
        "http://localhost:3000",
        "https://mascotapps-front-pass-mb57.vercel.app",
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
require("../config/pass-setup");
app.use(passport.initialize());
app.use(passport.session());
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// Corre este callback y se va a serializar el usuario.
app.get("/auth/google/redirect", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://mascotapps-front-pass-mb57.vercel.app/home"); //homepage de la aplicación en React.
});
app.get("/getuser", (req, res) => {
    res.send(req.user);
});
//!-------
//! middlewares para encriptar la cookie que voy a enviar al browser:
//! NO LA USAMOS A ESTA? SE REEMPLAZA POR SESSION?
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
app.use("/users", users_1.default);
app.use("/pets", pets_1.default);
app.use("/checkout", checkout_1.default);
//! falta que del front hagan un get a esta ruta cada vez que alguien pasa por su lading page. Voy a comentarla ahora para probar passport. Pero habría que mover esta ruta a otra ruta más específica y que desde el front le tiren GETs cada vez que se monta el landing por ejemplo.
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ENTRÉ AL GET DE '/' y el req.user es " + req.user);
}));
app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.send("done");
    }
});
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
