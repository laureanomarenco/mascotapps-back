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
        city: "rosario",
        contact: "2566-89889",
        image: "",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "sofia perez",
        email: "sofiperez@sspp.com",
        password: "asasdasdd12",
        city: "buenos aires",
        contact: "11-9865432",
        image: "https://us.123rf.com/450wm/stylephotographs/stylephotographs1905/stylephotographs190500492/123034323-foto-de-pasaporte-biom%C3%A9trico-de-una-joven-rubia-con-rostro-serio.jpg?ver=6"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "nina maria",
        email: "nmaria@sspp.com",
        password: "23334d12",
        city: "cordoba",
        contact: "351-986314",
    },
    {
        id: (0, uuid_1.v4)(),
        name: "ramon ramos",
        email: "ramon@sspp.com",
        password: "ssd12",
        city: "buenos aires",
        contact: "11-9865632",
        image: "https://us.123rf.com/450wm/stylephotographs/stylephotographs1905/stylephotographs190500492/123034323-foto-de-pasaporte-biom%C3%A9trico-de-una-joven-rubia-con-rostro-serio.jpg?ver=6"
    },
];
