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
const index_1 = __importDefault(require("../../models/index"));
const AnimalValidators_1 = require("../auxiliary/AnimalValidators");
// import { Ages, Genders, Pet, Species, Status } from "../types/petTypes";
const router = (0, express_1.Router)();
// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------
const getAllPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPets = yield index_1.default.Animal.findAll();
        // console.log(allPets);
        return allPets;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
function getPetById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`fn getById; id: ${id}`);
        try {
            let petFoundById = yield index_1.default.Animal.findByPk(id);
            console.log(`petFoundById: ${petFoundById}`);
            console.log(`${petFoundById.name}`);
            return petFoundById;
        }
        catch (error) {
            return error.message;
        }
    });
}
function getAllDogs() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllDogs");
        let allDogsFromDB = yield index_1.default.Animal.findAll({
            where: {
                specie: "perro",
            },
        });
        console.log(`length de allDogsFromDB: ${allDogsFromDB.length}`);
        return allDogsFromDB;
    });
}
function getAllCats() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllCats");
        let allCatsFromDB = yield index_1.default.Animal.findAll({
            where: {
                specie: "gato",
            },
        });
        console.log(`length de allCatsFromDB: ${allCatsFromDB.length}`);
        return allCatsFromDB;
    });
}
function getAllOtherSpecie() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllOtherSpecie");
        let allOtherSpeciesFromDB = yield index_1.default.Animal.findAll({
            where: {
                specie: "otra especie",
            },
        });
        console.log(`length de allOtherSpeciesFromDB: ${allOtherSpeciesFromDB.length}`);
        return allOtherSpeciesFromDB;
    });
}
function getAllLost() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllLost");
        let allLostFromDB = yield index_1.default.Animal.findAll({
            where: {
                status: "perdido",
            },
        });
        console.log(`length de allLostFromDB: ${allLostFromDB.length}`);
        return allLostFromDB;
    });
}
function getAllFound() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllFound");
        let allFoundFromDB = yield index_1.default.Animal.findAll({
            where: {
                status: "encontrado",
            },
        });
        console.log(`length de allFoundFromDB: ${allFoundFromDB.length}`);
        return allFoundFromDB;
    });
}
// ----- ------ ------- RUTAS :  ------ ------- -------
// aca tiene que haber validador porque solo usuarios registrados pueden acceder a esta ruta
//POST A PET:
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al POST de Animal!");
    try {
        let validatedPet = (0, AnimalValidators_1.validateNewPet)(req.body);
        console.log("SOY VALIDATED PET: ");
        console.log(validatedPet);
        let createdPet = yield index_1.default.Animal.create(validatedPet);
        return res.status(201).send(createdPet);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL PETS:
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al get de pets!");
    try {
        let allThePets = yield getAllPets();
        // console.log(allThePets);
        return res.status(200).send(allThePets);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL DOGS
router.get("/perros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré al GET /perros`);
    try {
        let dogsFromDB = yield getAllDogs();
        console.log(`dogsFromDB.length = ${dogsFromDB.length}`);
        return res.status(200).send(dogsFromDB);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL CATS
router.get("/gatos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré al GET /gatos`);
    try {
        let catsFromDB = yield getAllCats();
        console.log(`catsFromDB.length = ${catsFromDB.length}`);
        return res.status(200).send(catsFromDB);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL OTHER SPECIES
router.get("/otra", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré al GET /otra`);
    try {
        let otherSpeciesFromDB = yield getAllOtherSpecie();
        console.log(`otherSpeciesFromDB.length = ${otherSpeciesFromDB.length}`);
        return res.status(200).send(otherSpeciesFromDB);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL LOST
router.get("/perdido", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré al GET /perdido`);
    try {
        let allLostFromDB = yield getAllLost();
        console.log(`allLostFromDB.length = ${allLostFromDB.length}`);
        return res.status(200).send(allLostFromDB);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL FOUND
router.get("/encontrado", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré al GET /encontrado`);
    try {
        let allFoundFromDB = yield getAllFound();
        console.log(`allFoundFromDB.length = ${allFoundFromDB.length}`);
        return res.status(200).send(allFoundFromDB);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET BY ID:
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let paramsID = req.params.id;
    console.log(`entré a get by id con params.id = ${req.params.id}`);
    try {
        let petFoundById = yield getPetById(paramsID);
        return res.status(200).send(petFoundById);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
