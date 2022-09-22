"use strict";
//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "../../config/config.js")[env];
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
// import { validateNewUser } from "./auxiliary/UserValidators";
// import { UserAttributes } from "./types/userTypes";
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
var corsOptions = {
    origin: ["https://mascotapps.vercel.app", "http://localhost:3000"],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
//app.set("trust proxy", 1);
// ruta para testear que responde la api:
// app.get("/ping", (_req, res) => {
//   // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
//   console.log("Someone pinged here!!!");
//   res.send("pong");
// });
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: 'https://worker-production-2aad.up.railway.app',
//   clientID: 'YKWqA32lwyrttvqr5ce3sWfmkY1y9CME',
//   issuerBaseURL: 'https://dev-nxuk8wmn.us.auth0.com'
// };
// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));
// // req.isAuthenticated is provided from the auth router
// app.get('/', (req: any, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
// app.get('/profile', requiresAuth(), (req: any, res) => {    
//   res.send(req.oidc.user);
// });
// RUTAS:
app.use("/users", users_1.default);
app.use("/pets", pets_1.default);
app.use("/checkout", checkout_1.default);
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
