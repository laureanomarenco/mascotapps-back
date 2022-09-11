"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pets = void 0;
const uuid_1 = require("uuid");
exports.pets = [
    {
        id: (0, uuid_1.v4)(),
        name: "loki",
        race: "mestizo",
        status: "encontrado",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "rex",
        race: "ovejero alemán",
        status: "encontrado",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "popi",
        race: "mestizo",
        status: "encontrado",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "gabo",
        race: "labrador",
        status: "perdido",
    },
];
