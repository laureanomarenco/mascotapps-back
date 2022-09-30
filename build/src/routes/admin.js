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
const transactionTypes_1 = require("../types/transactionTypes");
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const router = (0, express_1.Router)();
// ----- FUNCIONES AUXILIARES: ------
// GET ALL REVIEWS TO USER by id
function getAllReviewsToUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allReviewsToUser = yield index_1.default.Review.findAll({
                where: {
                    UserId: id,
                },
            });
            console.log(`reviews al User encontradas: ${allReviewsToUser.length}`);
            return allReviewsToUser;
        }
        catch (error) {
            console.log(`Error en function getAllReviewsToUser en /admin/`);
            throw new Error(`Error al buscar las reviews que el usuario recibió.`);
        }
    });
}
// GET POSTS OF USER by id
function getPostsOfUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`En getPostsOfUser...`);
        try {
            console.log(`id ingresado como argumento: ${id}`);
            let postsOfUser = yield index_1.default.Animal.findAll({
                where: {
                    UserId: id,
                },
            });
            console.log(`Encontrados ${postsOfUser === null || postsOfUser === void 0 ? void 0 : postsOfUser.length} posts con el id ingresado.`);
            return postsOfUser;
        }
        catch (error) {
            console.log(`Error en getPostsOfUser: ${error.message}`);
            throw new Error(`${error.message}`);
        }
    });
}
//---------------------- RUTAS: -----------------------------
router.post("/deleteUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a /admin/deleteUser`);
    try {
        let idFromReq = req.body.id;
        let emailFromReq = req.body.email;
        let passwordFromReq = req.body.password;
        if (passwordFromReq != process.env.ADMIN_PASSWORD) {
            return res.status(403).send(`La password de administrador no es válida`);
        }
        let userToBeDeleted = yield index_1.default.User.findOne({
            where: {
                [sequelize_1.Op.and]: [{ id: idFromReq }, { email: emailFromReq }],
            },
        });
        if (!userToBeDeleted) {
            console.log(`Usuario no encontrado con ese email y Id.`);
            throw new Error(`Usuario no encontrado con email "${emailFromReq}" y id "${idFromReq}.`);
        }
        else {
            yield userToBeDeleted.destroy();
            console.log(`Usuario destruido suavemente.`);
            return res
                .status(200)
                .send(`Usuario con email "${emailFromReq}" y id "${idFromReq}" eliminado.`);
        }
    }
    catch (error) {
        console.log(`Error en /admin/deleteUser. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/cleanPostsOfUserId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /admin/clean`);
    try {
        let passwordFromReq = req.body.password;
        if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
            return res.status(403).send(`La password de administrador no es válida`);
        }
        if (!req.body.userId) {
            throw new Error(`Debe ingresar un userId. Usted envió "${req.body.userId}"`);
        }
        console.log(`req.body.userId = ${req.body.userId}`);
        let userId = req.body.userId;
        let postsOfUser = yield getPostsOfUser(userId);
        if (!postsOfUser) {
            throw new Error(`No se encontraron posts del user con id ${userId}`);
        }
        console.log(`Número de posts encontrados: ${postsOfUser === null || postsOfUser === void 0 ? void 0 : postsOfUser.length}`);
        console.log("Iniciando soft destruction de posteos...");
        let numberOfPostsDestroyed = 0;
        for (const post of postsOfUser) {
            yield post.destroy();
            console.log("post destruido");
            numberOfPostsDestroyed++;
        }
        return res
            .status(200)
            .send(`Número de posts destruidos: ${numberOfPostsDestroyed}`);
    }
    catch (error) {
        console.log(`Error en la ruta /admin/cleanPostsOfUserId. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/cleanReviewsToUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`En ruta /admin/cleanReviewsToUser`);
    try {
        let passwordFromReq = req.body.password;
        if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
            return res.status(403).send(`La password de administrador no es válida`);
        }
        let userId = req.body.userId;
        console.log(`userId recibido = ${userId}`);
        let allReviewsToUser = yield getAllReviewsToUser(userId);
        if (!allReviewsToUser) {
            throw new Error(`Las reviews al usuario encontradas es falso.`);
        }
        if (Array.isArray(allReviewsToUser) && allReviewsToUser.length === 0) {
            return res.status(200).send("No parecen haber reviews con ese UserId");
        }
        let reviewsErased = 0;
        console.log(`Empezando a borrar reviews... Reviews por borrar: ${allReviewsToUser.length}`);
        for (const review of allReviewsToUser) {
            yield review.destroy();
            console.log("Review borrada...");
            reviewsErased++;
        }
        console.log("Cantidad de reviews borradas: " + reviewsErased);
        return res
            .status(200)
            .send(`Cantidad de reviews soft destroyed: ${reviewsErased}`);
    }
    catch (error) {
        console.log(`Error en /cleanReviewsToUser. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// DELETE PETS WITH NO UserId
router.post("/deletePetsWithNoUserId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //como no puedo hacer una búsqueda pasando un parámetro nulo, voy a buscar todas las pets y filtrar las que tienen UserId == false.
    console.log(`En ruta /admin/deletePetsWithNoUserId`);
    try {
        let passwordFromReq = req.body.password;
        if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
            return res.status(403).send(`La password de administrador no es válida`);
        }
        let allThePetsWithNoUser = yield index_1.default.Animal.findAll({
            where: {
                UserId: {
                    [sequelize_1.Op.eq]: null,
                },
            },
        });
        console.log(`Cantidad de pets encontradas: ${allThePetsWithNoUser === null || allThePetsWithNoUser === void 0 ? void 0 : allThePetsWithNoUser.length}`);
        console.log(`Empezando a borrar mascotas con UserId === null`);
        let petsDestroyed = 0;
        for (const pet of allThePetsWithNoUser) {
            yield pet.destroy();
            console.log(`Animal soft destroyed...`);
            petsDestroyed++;
        }
        return res
            .status(200)
            .send(`Cantidad de Mascotas/Posts eliminados: ${petsDestroyed}.`);
    }
    catch (error) {
        console.log(`Error en /admin/deletePetsWithNoUserId. ${error.message}`);
    }
}));
// ----   RUTAS MULTIPLICADORAS:  -----------
router.get("/createMultiplier", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const multiplier = yield index_1.default.Multiplier.findAll();
        if (multiplier.length === 0) {
            yield index_1.default.Multiplier.create({ number: 1 });
            res.send("multiplicador creado");
        }
        res.send("el multiplicador ya existe");
    }
    catch (error) {
        console.log(`Error en /admin/changeMultiplier. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/changeMultiplier", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a /admin/changeMultiplier`);
    try {
        let passwordFromReq = req.body.password;
        if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
            return res.status(403).send(`La password de administrador no es válida`);
        }
        const { newMultiplier } = req.body;
        const multiplier = yield index_1.default.Multiplier.findByPk(1);
        let newMultiplierToNumber = Number(newMultiplier);
        multiplier.number = newMultiplierToNumber;
        yield multiplier.save();
        res.send(`multiplicador cambiado. Valor actual = ${multiplier.number}`);
    }
    catch (error) {
        console.log(`Error en /admin/changeMultiplier. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// --- RUTAS DEPRECADAS O YA SIN SENTIDO :
router.post("/mutateActiveToActivo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a /admin/mutateActiveToActivo`);
    let password = req.body.password;
    try {
        if (password != process.env.ADMIN_PASSWORD) {
            return res.status(403).send(`La password de administrador no es válida`);
        }
        let allActiveTransactions = yield index_1.default.Transaction.findAll({
            where: {
                status: "active",
            },
        });
        let numberModified = 0;
        for (const trans of allActiveTransactions) {
            trans.status = transactionTypes_1.transactionStatus.Active;
            yield trans.save();
            numberModified++;
            console.log(`Transacciones modificadas de "active" a ${transactionTypes_1.transactionStatus.Active}: ${numberModified}`);
        }
        return res.status(200).send({ transactionsModified: `${numberModified}` });
    }
    catch (error) {
        console.log(`Error en el /admin/mutateActiveToActivo`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
