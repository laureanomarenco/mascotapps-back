"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const express_1 = __importDefault(require("express"));
const user_Routes_1 = __importDefault(require("./routes/user/user-Routes"));
const pet_Routes_1 = __importDefault(require("./routes/pet/pet-Routes"));
const checkout_Routes_1 = __importDefault(require("./routes/checkout/checkout-Routes"));
const visitor_Routes_1 = __importDefault(require("./routes/visitor/visitor-Routes"));
const transaction_Routes_1 = __importDefault(require("./routes/transaction/transaction-Routes"));
const review_Routes_1 = __importDefault(require("./routes/review/review-Routes"));
const comment_Routes_1 = __importDefault(require("./routes/comment/comment-Routes"));
const admin_Routes_1 = __importDefault(require("./routes/admin/admin-Routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(morgan("dev"));
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
app.use("/users", user_Routes_1.default);
app.use("/pets", pet_Routes_1.default);
app.use("/checkout", checkout_Routes_1.default);
app.use("/visitor", visitor_Routes_1.default);
app.use("/reviews", review_Routes_1.default);
app.use("/transactions", transaction_Routes_1.default);
app.use("/comments", comment_Routes_1.default);
app.use("/admin", admin_Routes_1.default);
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
