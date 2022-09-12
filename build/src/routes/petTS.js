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
const express_1 = require("express");
const index_1 = __importDefault(require("../models/index"));
const PetTSValidators_1 = require("../auxiliary/PetTSValidators");
// import { Ages, Genders, Pet, Species, Status } from "../types/petTypes";
const router = (0, express_1.Router)();
const getAllPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPets = yield index_1.default.PetTS.findAll();
        // console.log(allPets);
        return allPets;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al get de petTS!");
    try {
        let allThePets = yield getAllPets();
        // console.log(allThePets);
        return res.status(200).send(allThePets);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al POST de petTS!");
    try {
        let validatedPet = (0, PetTSValidators_1.validateNewPet)(req.body);
        console.log("SOY VALIDATED PET: ");
        console.log(validatedPet);
        let createdPet = yield index_1.default.PetTS.create(validatedPet);
        return res.status(200).send(createdPet);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
