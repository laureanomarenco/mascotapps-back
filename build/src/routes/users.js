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
// import axios from "axios";
//import { UserAttributes } from "../../models/user"
const router = (0, express_1.Router)();
// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield index_1.default.User.findAll();
        // console.log(allUsers);
        return allUsers;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
// ----- ------ ------- RUTAS :  ------ ------- -------
//GET ALL USERS FROM DB:  //! Hay que dejarla comentada ( o borrarla) porque no es seguro poder tener toda la data de los users registrados:
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al get de Users!");
    try {
        let allTheUsers = yield getAllUsers();
        // console.log(allTheUsers);
        return res.status(200).send(allTheUsers);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
// GET NUMBER OF USERS IN DB:
router.get("/numberOfUsersInDB", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré a la route /numberOfUsersInDB");
    try {
        let allUsersInDB = yield getAllUsers();
        let numberOfUsersInDB = allUsersInDB.length;
        let numberOfUsersInDBtoString = `${numberOfUsersInDB}`;
        return res.status(200).send(numberOfUsersInDBtoString);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req, res, next) => {
    //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
    console.log("En el authCheck de /users");
    console.log(req === null || req === void 0 ? void 0 : req.user);
    if (!req.user) {
        console.log("redirigiendo al /auth/google");
        res.redirect("/auth/google");
    }
    else {
        console.log("Usuario autenticado (req.user existe)");
        console.log("continuando con el siguiente middleware");
        next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
    }
};
//POST NEW PET:
// validar usuario que sea uno registrado.
// obtener su ID que lo voy a usar para asociarlo a la new pet.
// obtener el req.body que va a tener los datos de la new pet.
// validar el req.body antes de crear el new pet en la DB.
// crear la validatedPet en la DB
// asociar la validatedPet con el userID del que la posteó
//! retonar la associatedPetWithUser o la createdPet?????
router.post("/postnewpet", authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a users/postnewpet`);
    try {
        console.log(`req.user es = ${req === null || req === void 0 ? void 0 : req.user}`);
        let userID = req.user.id;
        console.log(`userID = ${userID}`);
        console.log(`req.body = `);
        console.log(req.body);
        let validatedPet = (0, AnimalValidators_1.validateNewPet)(req.body);
        console.log("SOY VALIDATED PET: ");
        console.log(validatedPet);
        let createdPet = yield index_1.default.Animal.create(validatedPet);
        //asociar createdPet con el userID:
        let associatedPetWithUser = yield createdPet.setUser(userID);
        return res.status(200).send(associatedPetWithUser);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
// router.post("/", async (req, res) => {
//   try {
//     let validatedPet: UserAttributes = validateNewUser(req.body);
//     let createdPet = await db.User.create(validatedUser);
//     return res.status(200).send(createdPet);
//   } catch (error: any) {
//     return res.status(404).send(error.message);
//   }
// })
// Hacer más rutas
exports.default = router;
