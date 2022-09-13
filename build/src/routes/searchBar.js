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
const sequelize_1 = require("sequelize");
const express_1 = require("express");
const index_1 = __importDefault(require("../../models/index"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    console.log(name);
    try {
        const searchedPets = yield index_1.default.Animal.findAll({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: '%' + name + '%'
                },
                /*   race:{
                    [Op.iLike]: '%' + name + '%'
                  } */
            }
        });
        res.send(searchedPets);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
exports.default = router;
