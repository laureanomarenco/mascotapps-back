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
//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "../../config/config.js")[env];
const index_1 = __importDefault(require("../models/index"));
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const pets_1 = __importDefault(require("./routes/pets"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const visitor_1 = __importDefault(require("./routes/visitor"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const review_1 = __importDefault(require("./routes/review"));
const comment_1 = __importDefault(require("./routes/comment"));
const admin_1 = __importDefault(require("./routes/admin"));
const express_openid_connect_1 = require("express-openid-connect"); //! auth0
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const { auth } = require("express-openid-connect");
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_AUTH,
    baseURL: process.env.BASE_URL_AUTH,
    clientID: process.env.CLIENT_ID_AUTH,
    issuerBaseURL: process.env.ISSUER_AUTH,
};
var corsOptions = {
    origin: [
        "https://mascotapps.vercel.app",
        "http://localhost:3000",
        "https://checkout.stripe.com",
        "https://dev-nxuk8wmn.us.auth0.com",
    ],
    headers: "*",
    methods: "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// RUTAS:
app.use("/users", users_1.default);
app.use("/pets", pets_1.default);
app.use("/checkout", checkout_1.default);
app.use("/visitor", visitor_1.default);
app.use("/reviews", review_1.default);
app.use("/transactions", transaction_1.default);
app.use("/comments", comment_1.default);
app.use("/admin", admin_1.default);
//! rutas de prueba:
app.get("/callback", (req, res) => {
    console.log(`pasé por /callback. Redirigiendo a vercel/home`);
    try {
        // res.header();
        res.redirect("https://mascotapps.vercel.app/home");
    }
    catch (error) {
        console.log(`Error en /callback`);
    }
});
app.get("/testauth", (0, express_openid_connect_1.requiresAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`entré a auth/getuserinfo`);
    try {
        console.log(req.oidc);
        console.log("REQ.OIDC.USER : ");
        console.log(req.oidc.user);
        let userInDB = yield index_1.default.User.findByPk(req.oidc.user.sub);
        if (!userInDB) {
            let reqUser = req.oidc.user;
            let newUser = yield index_1.default.User.create({
                email: reqUser.email,
                id: reqUser.sub,
                name: reqUser.name,
                image: reqUser.picture,
            });
            console.log("NEW USER: ");
            console.log(newUser);
            return res.status(200).send(newUser);
        }
        else {
            console.log("Usuario encontrado en la DB! :");
            return res.status(200).send(userInDB);
        }
    }
    catch (error) {
        console.log(`error! ${error.message}`);
    }
}));
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
