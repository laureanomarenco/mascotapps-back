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
// GET CONTACT INFO OF USER (AUTH):
// La info de contacto del usuario vamos a obtenerla gracias al :petid. Desde el front tienen que enviarnos el id de la mascota por params, y nosotros buscamos el id de la mascota en la DB para obtener su UserId que tiene asociado.
// Una vez que tener el UserId, vamos a la tabla de Users en la DB y buscamos ese ID.
// Una vez encontrado ese User mediante el ID, obtenemos cierta información para retornarle al cliente. info a obtener: diplayName, email, aditionalContactInfo.
//--
// obtener petID
// buscar en la DB ese petID
// obtener el UserId de esa instancia de Pet
// buscar en la DB en la tabla de Users el id = UserID
router.get("/contactinfo/:petid", authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /users/contactinfo/:petid`);
    console.log(`:petid = ${req.params.petid}`);
    try {
        let petID = req.params.petid;
        let petInDB = yield index_1.default.Animals.findByPk(petID);
        let ownerID = petInDB.UserId;
        let ownerInDB = yield index_1.default.Users.findByPk(ownerID);
        let contactInfoOfOwner = {
            displayName: ownerInDB.displayName,
            name: ownerInDB.name,
            email: ownerInDB.email,
            postalCode: ownerInDB.postalCode,
            aditionalContactInfo: ownerInDB.aditionalContactInfo,
            thumbnail: ownerInDB.thumbnail,
        };
        console.log(`contactInfoOfOwner = ${contactInfoOfOwner}`);
        return res.status(200).send(contactInfoOfOwner);
    }
    catch (error) {
        console.log(`error en /contactinfo/:petid = ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// GET ALL PETS OF AUTH USER ID:
// obtener todas las instancias de mascotas que tienen como UserId el id del usuario que quiere obtener el listado de mascotas.
// Esta ruta serviría para que un usuario pueda ver su listado de mascotas posteadas, desde su perfíl.
// Hay que ver el req.user.id de la cookie, y buscar en la tabla Animals (mascotas) todas las instancias que tienen como UserId un valor igual al req.user.id.
// Recolectamos esas instancias en un arreglo y enviamos ese arreglo al cliente.
//---
// /users/getallpetsofuser
router.get("/getallpetsofuser", authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`Entré a la ruta /users/getallpetsofuser`);
    console.log(`user ID = ${(_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id}`);
    try {
        let userID = req.user.id;
        let petsPostedByUser = yield index_1.default.Animals.findAll({
            where: {
                UserId: userID,
            },
        });
        return res.status(200).send(petsPostedByUser);
    }
    catch (error) {
        console.log(`error en el /users/getallpetsofusers: ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// DELETE PET:
// Esta ruta va a intentar eliminar de la DB una instancia de Animal.
// va a obtener el req.user.id de la cookie, y va a obtener el id de la mascota a eliminar, buscando el req.params.petid.
router.delete("/deletepet/:petid", authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log(`En la ruta users/deletepet/:petid.`);
    console.log(`:petid = ${req.params.petid}`);
    console.log(`req.user.id = ${(_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id}`);
    try {
        let petID = req.params.petid;
        let userID = req.user.id;
        //buscar instancia de mascota en DB:
        let petToDeleteInDB = yield index_1.default.Animals.findByPk(petID);
        if (petToDeleteInDB.UserId == userID) {
            //borrar instancia de la DB:
            let deletedPet = yield petToDeleteInDB.destroy();
            console.log(`pet with id ${petToDeleteInDB.id} and pet.UserId = ${petToDeleteInDB.UserId}...  soft-destroyed`);
            return res.status(200).send(deletedPet);
        }
        else {
            //retornar que no coincide el petToDelete.UserId con el req.user.id
            return res
                .status(400)
                .send(`El ID del cliente no coincide con el UserId de la mascota.`);
        }
    }
    catch (error) {
        console.log(`Hubo un error en el users/deletepet/:petid = ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// Hacer más rutas
exports.default = router;
