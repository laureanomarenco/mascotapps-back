"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const uuid_1 = require("uuid");
exports.users = [
    {
        id: (0, uuid_1.v4)(),
        name: "Juan",
        email: "juan@ss.com",
        password: "asdasd12",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "sofia perez",
        email: "sofiperez@sspp.com",
        password: "asasdasdd12",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "nina maria",
        email: "nmaria@sspp.com",
        password: "23334d12",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "ramon ramos",
        email: "ramon@sspp.com",
        password: "ssd12",
    },
];
