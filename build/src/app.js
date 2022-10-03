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

// var jwt = require("express-jwt");
const { expressjwt: jwt } = require("express-jwt");
var jwks = require("jwks-rsa");
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-nxuk8wmn.us.auth0.com/.well-known/jwks.json",
    }),
    audience: "https://juka-production.up.railway.app/",
    issuer: "https://dev-nxuk8wmn.us.auth0.com/",
    algorithms: ["RS256"],
});
// app.use(jwtCheck);

var corsOptions = {
    origin: [
        "https://mascotapps.vercel.app",
        "http://localhost:3000",

        "http://localhost:3000/home",
        "https://checkout.stripe.com",
        "https://dev-nxuk8wmn.us.auth0.com",
        "http://localhost:3001",

    ],
    headers: "*",
    methods: "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));

app.use(express_1.default.urlencoded({ extended: true }));

app.use("/users", users_1.default);
app.use("/pets", pets_1.default);
app.use("/checkout", checkout_1.default);
app.use("/visitor", visitor_1.default);
app.use("/reviews", review_1.default);
app.use("/transactions", transaction_1.default);
app.use("/comments", comment_1.default);
app.use("/admin", admin_1.default);
//! rutas de prueba:

app.get("/testauth", jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`entré a /TESTAUTH`);
    try {
        console.log("REQ : ");
        console.log(req.user);
        console.log(req.auth);
        console.log((_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub);
        return res.status(200).send("RECIBIDOO!!");
    }
    catch (error) {
        console.log(`error! ${error.message}`);
    }
}));
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
