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
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../../models/index"));
const AnimalValidators_1 = require("../auxiliary/AnimalValidators");
const petTypes_1 = require("../types/petTypes");
// import { Ages, Genders, Pet, Species, Status } from "../types/petTypes";
const router = (0, express_1.Router)();
// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------
function mapSpecies() {
    let speciesArray = Object.values(petTypes_1.Species);
    return speciesArray;
}
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
function getNumberOfPetsInDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("En la fn getNumberOfPetsInDB");
        try {
            let allPetsInDB = yield getAllPets();
            let numberOfPetsInDB = allPetsInDB.length;
            console.log(`numberOfPetsInDB: ${numberOfPetsInDB}`);
            return numberOfPetsInDB;
        }
        catch (error) {
            return error.message;
        }
    });
}
function getPetById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`fn getById; id: ${id}`);
        try {
            let petFoundById = yield index_1.default.Animal.findByPk(id);
            console.log(`petFoundById: ${petFoundById}`);
            console.log(`${petFoundById === null || petFoundById === void 0 ? void 0 : petFoundById.name}`);
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
function getAllInAdoption() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Entré a la ruta getAllInAdoption");
        let allInAdoptionFromDB = yield index_1.default.Animal.findAll({
            where: {
                status: "en adopción",
            },
        });
        console.log(`length de allFoundFromDB: ${allInAdoptionFromDB.length}`);
        return allInAdoptionFromDB;
    });
}
function getAllByNameOrRace(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchedPets = yield index_1.default.Animal.findAll({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: "%" + input + "%",
                },
            },
        });
        const searchedPetsRace = yield index_1.default.Animal.findAll({
            where: {
                race: {
                    [sequelize_1.Op.iLike]: "%" + input + "%",
                },
            },
        });
        const allPets = searchedPets.concat(searchedPetsRace);
        return allPets;
    });
}
//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req, res, next) => {
    //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
    console.log("EN EL authCheck!");
    console.log(req.user);
    if (!req.user) {
        console.log("redirigiendo al /auth/login");
        res.redirect("/auth/login");
    }
    else {
        console.log("continuando con el siguiente middleware");
        next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
    }
};
//! ruta de prueba con authCheck:
router.get("/secretos", authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("en /secretos");
    try {
        let allCats = yield getAllCats();
        return res.status(200).send(allCats);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
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
// GET NUMBER OF PETS IN DB:
router.get("/numberofpetsindb", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("En route /numberofpets");
    try {
        let numberOfPetsInDB = yield getNumberOfPetsInDB();
        let numberOfPetsInDBtoString = `${numberOfPetsInDB}`;
        return res.status(200).send(numberOfPetsInDBtoString);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//GET ALL SPECIES:
router.get("/especies", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al GET all species");
    try {
        let speciesArray = mapSpecies();
        console.log(`species Array = ${speciesArray}`);
        return res.status(200).send(speciesArray);
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
//GET ALL IN ADOPTION
router.get("/adopcion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré al GET /adopcion`);
    try {
        let allInAdoptionDB = yield getAllInAdoption();
        console.log(`allInAdoptionDB.length = ${allInAdoptionDB.length}`);
        return res.status(200).send(allInAdoptionDB);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.query;
    let result = yield getAllByNameOrRace(input);
    return res.json(result);
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
        console.log(`retornando error en GET /:id: ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
