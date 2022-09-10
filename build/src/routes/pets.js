"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const petServices = __importStar(require("../services/petServices"));
// import { Pet } from "../types";
const petUtils_1 = require("../petUtils");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("Entré al get de pets");
    try {
        let allPets = petServices.getAllPets();
        return res.status(200).send(allPets);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
});
router.get("/:id", (req, res) => {
    console.log("entré al get por params id");
    try {
        let id = req.params.id;
        let petById = petServices.getPetById(id);
        return res.status(200).send(petById);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
});
router.post("/", (req, res) => {
    console.log("entré al post de pets");
    console.log("req.body: ");
    console.log(req.body);
    try {
        const newPetEntry = (0, petUtils_1.toNewPetEntry)(req.body);
        const addedPetEntry = petServices.addNewPet(newPetEntry);
        return res.status(200).send(addedPetEntry);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.default = router;
