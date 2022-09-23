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
// get Some User Info:
function getSomeUserInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Ejecutando función auxiliar someUserInfo`);
        console.log(`userId = ${userId}`);
        try {
            let userInfo = index_1.default.User.findByPk(userId);
            if (userInfo) {
                let someUserInfo = {
                    name: userInfo.name,
                    city: userInfo.city,
                    image: userInfo.image,
                    contact: userInfo.contact,
                };
                console.log(`retornando someUserInfo: ${someUserInfo}`);
                return someUserInfo;
            }
            else {
                throw new Error(`usuario no encontrado`);
            }
        }
        catch (error) {
            console.log(`Error en la función auxiliar someUserInfo: ${error.message}`);
            return error;
        }
    });
}
//Parse Pets Posted By User ---> deja afuera el UserId
function parsePetsPostedByUser(petsPostedByUser) {
    console.log(`En function auxiliary parsePetsPostedByUser`);
    try {
        let parsedPets = petsPostedByUser.map((pet) => {
            return {
                id: pet.id,
                name: pet.name,
                city: pet.city,
                specie: pet.specie,
                race: pet.race,
                age: pet.age,
                gender: pet.gender,
                status: pet.status,
                vaccinationSchemeStatus: pet.vaccinationSchemeStatus,
                image: pet.image,
                comments: pet.comments,
                withNewOwner: pet.withNewOwner,
                backWithItsOwner: pet.backWithItsOwner,
            };
        });
        console.log(`Retornando parsedPets. parsedPets.length = ${parsedPets.length}`);
        return parsedPets;
    }
    catch (error) {
        return error;
    }
}
//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.send({ msg: "el usuario no existe" });
    }
    else {
        next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta
    }
};
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
// GET CONTACT INFO / PET ID
router.get("/contactinfo/:petid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /users/contactinfo/:petid`);
    console.log(`:petid = ${req.params.petid}`);
    try {
        let petID = req.params.petid;
        let petInDB = yield index_1.default.Animal.findByPk(petID);
        let ownerID = petInDB === null || petInDB === void 0 ? void 0 : petInDB.UserId;
        let ownerInDB = yield index_1.default.User.findByPk(ownerID);
        let contactInfoOfOwner = {
            //displayName: ownerInDB.displayName,
            name: ownerInDB.name,
            email: ownerInDB.email,
            city: ownerInDB.city,
            image: ownerInDB.image,
            contact: ownerInDB.contact,
        };
        console.log(`contactInfoOfOwner = ${contactInfoOfOwner}`);
        return res.status(200).send(contactInfoOfOwner);
    }
    catch (error) {
        console.log(`error en /contactinfo/:petid = ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// GET(post) ALL PETS OF AUTH USER ID:
// obtener todas las instancias de mascotas que tienen como UserId el id del usuario que quiere obtener el listado de mascotas.
// Esta ruta serviría para que un usuario pueda ver su listado de mascotas posteadas, desde su perfíl.
// Hay que ver el req.user.id de la cookie, y buscar en la tabla Animal (mascotas) todas las instancias que tienen como UserId un valor igual al req.user.id.
// Recolectamos esas instancias en un arreglo y enviamos ese arreglo al cliente.
//---
// /users/getallpetsofuser
router.post("/getallpetsofuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`Entré a la ruta "/users/getallpetsofuser". El req.body es =`);
    console.log(req.body);
    console.log(`user ID = ${(_a = req.body) === null || _a === void 0 ? void 0 : _a.id}`);
    try {
        if (!req.body.id) {
            console.log(`Error en /users/getallpetsofuser. El req.body.id es falso/undefined`);
            throw new Error(`Error en /users/getallpetsofuser. El req.body.id es falso/undefined`);
        }
        let id = req.body.id;
        let petsPostedByUser = yield index_1.default.Animal.findAll({
            where: {
                UserId: id,
            },
        });
        if ((petsPostedByUser === null || petsPostedByUser === void 0 ? void 0 : petsPostedByUser.length) > 0) {
            let parsedPetsPostedByUser = parsePetsPostedByUser(petsPostedByUser);
            return res.status(200).send(parsedPetsPostedByUser);
        }
        else {
            console.log(`Retornando petsPostedByUser con .length <= 0. Su length es ${petsPostedByUser === null || petsPostedByUser === void 0 ? void 0 : petsPostedByUser.length}`);
            return petsPostedByUser;
        }
    }
    catch (error) {
        console.log(`error en el /users/getallpetsofusers: ${error.message}`);
        console.log(error);
        return res.status(404).send(error.message);
    }
}));
router.delete("/deletepet/:petid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    console.log(`En la ruta users/deletepet/:petid.`);
    console.log(`:petid = ${(_b = req.body) === null || _b === void 0 ? void 0 : _b.petid}`);
    console.log(`req.user.id = ${(_c = req.body) === null || _c === void 0 ? void 0 : _c.id}`);
    try {
        let petID = (_d = req.body) === null || _d === void 0 ? void 0 : _d.petid;
        let userID = (_e = req.body) === null || _e === void 0 ? void 0 : _e.id;
        //buscar instancia de mascota en DB:
        let petToDeleteInDB = yield index_1.default.Animal.findByPk(petID);
        if (petToDeleteInDB.UserId == userID) {
            //borrar instancia de la DB:
            // await petToDeleteInDB.destroy();
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
router.get("/numbervisitors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré a /numbervisitors");
    try {
        let arrayVisitors = yield index_1.default.Visitor.findAll();
        let numberOfVisitors = arrayVisitors.length;
        res.status(200).send(`${numberOfVisitors}`);
    }
    catch (error) {
        res.status(404).send(error);
    }
}));
router.post("/newuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, city, contact, image, id } = req.body;
    try {
        console.log("new user..", name);
        let [newUser, created] = yield index_1.default.User.findOrCreate({
            where: {
                name,
                email,
                id,
                city,
                contact,
                image,
            },
        });
        if (!created) {
            res.status(409).send("el usuario ya existe");
        }
        else {
            console.log("se creo");
            res.send(newUser);
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}));
router.post("/exists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        console.log("buscando si existe el usuario");
        let user = yield index_1.default.User.findOne({
            where: {
                id: id,
            },
        });
        if (user === null) {
            res.send({ msg: false });
        }
        else {
            res.send({ msg: true });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}));
router.post("/someUserInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    console.log(`Entré a la ruta /users/someUserInfo`);
    console.log(`req.body.id = ${(_f = req.body) === null || _f === void 0 ? void 0 : _f.id}`);
    try {
        if (req.body.id) {
            let userId = req.body.id;
            let someUserInfo = yield getSomeUserInfo(userId);
            console.log(`someUserInfo: ${someUserInfo}`);
            return res.status(200).send(someUserInfo);
        }
        else {
            throw new Error("El user Id enviado no es válido");
        }
    }
    catch (error) {
        console.log(`Error en /users/someUserInfo. Error: ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
exports.default = router;
