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
    try {
        let speciesArray = Object.values(petTypes_1.Species);
        return speciesArray;
    }
    catch (error) {
        console.log(`Error en fn mapSpecies(). Error message: ${error.message}`);
        return error.message;
    }
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
            console.log(`Error en la function getNumberOfPetsInDB. Error message: ${error.message}`);
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
            console.log(`Error en la function getPetById. Error message: ${error.message}`);
            return error.message;
        }
    });
}
function getAllDogs() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllDogs");
        try {
            let allDogsFromDB = yield index_1.default.Animal.findAll({
                where: {
                    specie: "perro",
                },
            });
            console.log(`length de allDogsFromDB: ${allDogsFromDB.length}`);
            return allDogsFromDB;
        }
        catch (error) {
            console.log(`Error en la function getAllDogs. Error: ${error.message}`);
            return error.message;
        }
    });
}
function getAllCats() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllCats");
        try {
            let allCatsFromDB = yield index_1.default.Animal.findAll({
                where: {
                    specie: "gato",
                },
            });
            console.log(`length de allCatsFromDB: ${allCatsFromDB.length}`);
            return allCatsFromDB;
        }
        catch (error) {
            console.log(`Error en la function getAllCats. Error message: ${error.message}`);
            return error.message;
        }
    });
}
function getAllOtherSpecie() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllOtherSpecie");
        try {
            let allOtherSpeciesFromDB = yield index_1.default.Animal.findAll({
                where: {
                    specie: "otra especie",
                },
            });
            console.log(`length de allOtherSpeciesFromDB: ${allOtherSpeciesFromDB.length}`);
            return allOtherSpeciesFromDB;
        }
        catch (error) {
            console.log(`Error en la function getAllOtherSpecie. Error message: ${error.message}`);
            return error.message;
        }
    });
}
function getAllLost() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllLost");
        try {
            let allLostFromDB = yield index_1.default.Animal.findAll({
                where: {
                    status: "perdido",
                },
            });
            console.log(`length de allLostFromDB: ${allLostFromDB.length}`);
            return allLostFromDB;
        }
        catch (error) {
            console.log(`Error en la function getAllLost. Error message: ${error.message}`);
            return error.message;
        }
    });
}
function getAllFound() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entré a la fn getAllFound");
        try {
            let allFoundFromDB = yield index_1.default.Animal.findAll({
                where: {
                    status: "encontrado",
                },
            });
            console.log(`length de allFoundFromDB: ${allFoundFromDB.length}`);
            return allFoundFromDB;
        }
        catch (error) {
            console.log(`Error en la function getAllFound. Error message: ${error.message}`);
            return error.message;
        }
    });
}
function getAllInAdoption() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Entré a la ruta getAllInAdoption");
        try {
            let allInAdoptionFromDB = yield index_1.default.Animal.findAll({
                where: {
                    status: "en adopción",
                },
            });
            console.log(`length de allFoundFromDB: ${allInAdoptionFromDB.length}`);
            return allInAdoptionFromDB;
        }
        catch (error) {
            console.log(`Error en la function getAllInAdoption. Error message: ${error.message}`);
            return error.message;
        }
    });
}
function getAllBy(input) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`En la function getAllByNameOrRace`);
        try {
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
            const searchedPetsSpecie = yield index_1.default.Animal.findAll({
                where: {
                    specie: {
                        [sequelize_1.Op.iLike]: "%" + input + "%",
                    },
                },
            });
            const searchedPetsGender = yield index_1.default.Animal.findAll({
                where: {
                    gender: {
                        [sequelize_1.Op.iLike]: "%" + input + "%",
                    },
                },
            });
            const allPets = [
                ...searchedPets,
                ...searchedPetsGender,
                ...searchedPetsRace,
                ...searchedPetsSpecie,
            ];
            return allPets;
        }
        catch (error) {
            console.log(`Error en la function getAllByNameOrRace. Error message: ${error.message}`);
            return error.message;
        }
    });
}
//! ----- MIDDLEWARE PARA AUTH : ------
// const authCheck = (req: any, res: any, next: any) => {
//   //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
//   console.log("En el authCheck de pets!");
//   console.log(req.user);
//   if (!req.user) {
//     console.log("redirigiendo al /auth/google");
//     res.redirect("/auth/google");
//   } else {
//     console.log("continuando con el siguiente middleware");
//     next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
//   }
// };
//! ruta de prueba con authCheck:
// router.get("/secretos", authCheck, async (req, res) => {
//   console.log("en /secretos");
//   try {
//     let allCats = await getAllCats();
//     return res.status(200).send(allCats);
//   } catch (error: any) {
//     return res.status(404).send(error.message);
//   }
// });
// ----- ------ ------- RUTAS :  ------ ------- -------
// aca tiene que haber validador porque solo usuarios registrados pueden acceder a esta ruta
//POST A PET:
router.post("/postnewpet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(`Entré a users/postnewpet`);
    let id = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        console.log(`user = ${id}`);
        console.log(`req.body = `);
        console.log(req.body);
        let validatedPet = (0, AnimalValidators_1.validateNewPet)(req.body.pet);
        console.log("SOY VALIDATED PET: ");
        console.log(validatedPet);
        let createdPet = yield index_1.default.Animal.create(validatedPet);
        //asociar createdPet con el userID:
        let associatedPetWithUser = yield createdPet.setUser(id);
        return res.status(200).send(associatedPetWithUser);
    }
    catch (error) {
        console.log(`Error en /postnewpet. Error message: ${error.message}`);
        console.log(`User id: ${id}`);
        return res.status(404).send(error.message);
    }
}));
// GET NUMBER OF PETS IN DB:
router.get("/numberofpetsindb", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("En route pets/numberofpets");
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
    console.log("entré al GET pets/especies");
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
    console.log("entré al GET pets/ ");
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
    console.log(`Entré al GET pets/perros`);
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
    console.log(`Entré al GET pets/gatos`);
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
    console.log(`Entré al GET pets/otra`);
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
    console.log(`Entré al GET pets/perdido`);
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
    console.log(`Entré al GET pets/encontrado`);
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
    console.log(`Entré al GET pets/adopcion`);
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
    console.log(`Entré al GET pets/search`);
    try {
        const { input } = req.query;
        console.log(`input = ${input}`);
        let result = yield getAllBy(input);
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(`Hubo un error ruta GET pets/search. Error message: ${error.message}`);
        return error.message;
    }
}));
//GET BY ID:
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    console.log(`Entré al GET pets/:id con params.id = ${(_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id}`);
    try {
        let paramsID = req.params.id;
        let petFoundById = yield getPetById(paramsID);
        return res.status(200).send(petFoundById);
    }
    catch (error) {
        console.log(`retornando error en GET pets/:id: ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
