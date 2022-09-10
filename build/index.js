"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diares_1 = __importDefault(require("./routes/diares"));
const users_1 = __importDefault(require("./routes/users"));
const pets_1 = __importDefault(require("./routes/pets"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
const PORT = 3001;
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.get("/ping", (_req, res) => {
    // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
    console.log("Someone pinged here!!!");
    res.send("pong");
});
app.use("/api/diaries", diares_1.default);
app.use("/api/users", users_1.default);
app.use("/api/pets", pets_1.default);
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});
