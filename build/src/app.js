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
const visitor_1 = __importDefault(require("./routes/visitor"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const review_1 = __importDefault(require("./routes/review"));
const comment_1 = __importDefault(require("./routes/comment"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
var corsOptions = {
    origin: [
        "https://mascotapps.vercel.app",
        "http://localhost:3000",
        "https://checkout.stripe.com",
    ],
    headers: "*",
    methods: "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// RUTAS:
app.use("/users", users_1.default);
app.use("/pets", pets_1.default);
app.use("/checkout", checkout_1.default);
app.use("/visitor", visitor_1.default);
app.use("/reviews", review_1.default);
app.use("/transactions", transaction_1.default);
app.use("/comments", comment_1.default);
//! falta que del front hagan un get a esta ruta cada vez que alguien pasa por su lading page. Voy a comentarla ahora para probar passport. Pero habría que mover esta ruta a otra ruta más específica y que desde el front le tiren GETs cada vez que se monta el landing por ejemplo.
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
