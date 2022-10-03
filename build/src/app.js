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
exports.jwtCheck = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const pets_1 = __importDefault(require("./routes/pets"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const visitor_1 = __importDefault(require("./routes/visitor"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const review_1 = __importDefault(require("./routes/review"));
const comment_1 = __importDefault(require("./routes/comment"));
const admin_1 = __importDefault(require("./routes/admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const { auth } = require("express-openid-connect");
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET_AUTH,
//   baseURL: "http://localhost:3001", //process.env.BASE_URL_AUTH,
//   clientID: "UyoWNVOewL3AwKDm9dVH32NftqztgdVH",
//   issuerBaseURL: "https://dev-nxuk8wmn.us.auth0.com",
// };
//!XXX AGregar esto que es una copia del otro repo que es el que funciona
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: "srKuo1tEHJhLA3PIvS9qi74BDsQ65r5pTPnDIkX1qKkQSTXy66S5zrDokUERkNYn", //process.env.SECRET
//   baseURL: "http://localhost:3001", //cambié esto de 3001 a 3000 y me parece que no fue bueno
//   clientID: "RVXfWxKNxYtQugjUSybTmxylkJfrHzUc",
//   issuerBaseURL: "https://dev-nxuk8wmn.us.auth0.com",
// };
//!------------------------
// var jwt = require("express-jwt");
const { expressjwt: jwt } = require("express-jwt");
var jwks = require("jwks-rsa");
exports.jwtCheck = jwt({
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
// app.use(cors()); //! XXX COMENTAR no dif.. 4
//!-- cookie y headers problem:
//! adicionales para CORS problem y cookies headers:
// const cookieParser = require("cookie-parser");  //! XXX COMENTAR TODO esto 4
// app.use(cookieParser()); //! cookie problem
// app.use((_, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   return next();
// });
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
app.get("/testauth", exports.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`entré a /TESTAUTH`);
    try {
        console.log("REQ : ");
        console.log(req.user);
        console.log(req.auth);
        console.log((_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub);
        // let userInDB = await db.User.findByPk(req.oidc.user.sub);
        // if (!userInDB) {
        //   let reqUser: any = req.oidc.user;
        //   let newUser = await db.User.create({
        //     email: reqUser.email,
        //     id: reqUser.sub,
        //     name: reqUser.name,
        //     image: reqUser.picture,
        //   });
        //   console.log("NEW USER: ");
        //   console.log(newUser);
        //   return res.status(200).send(newUser);
        // } else {
        //   console.log("Usuario encontrado en la DB! :");
        return res.status(200).send("RECIBIDOO!!");
    }
    catch (error) {
        console.log(`error! ${error.message}`);
    }
}));
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
