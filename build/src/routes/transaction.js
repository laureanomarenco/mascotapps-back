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
const TransactionValidators_1 = require("../auxiliary/TransactionValidators");
const transactionTypes_1 = require("../types/transactionTypes");
const petTypes_1 = require("../types/petTypes");
const { GMAIL_PASS, GMAIL_USER } = process.env;
const router = (0, express_1.Router)();
//-----  FUNCIONES AUXILIARES: -------------------------------
function getAllTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allTheTransactionsFromDB = yield index_1.default.Transaction.findAll();
            return allTheTransactionsFromDB;
        }
        catch (error) {
            console.log(`Error en function getAllTransactions. Error message: ${error.message} `);
            throw new Error(error.message);
        }
    });
}
function mailer(userOffering, userDemanding, offeringPet) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodemailer = require("nodemailer");
        console.log(GMAIL_PASS, GMAIL_USER);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });
        //Mail para el demanding
        let demandingMail = userDemanding.email;
        let offeringMail = userOffering.email;
        console.log(userDemanding.email, userOffering.email);
        const msgMailDemanding = `Registramos que ${userOffering.name} quiere contactarte por ${offeringPet.name}. Te deseamos suerte en tu busqueda y te facilitamos los siguientes datos para contactarte con ${userOffering.name}. Un saludo de parte del equipo de Mascotapp`;
        const mailOptionsDemanding = {
            from: "service.mascotapp@gmail.com",
            to: demandingMail,
            subject: "Alguien está interesado en una mascota tuya",
            html: `<div>${msgMailDemanding}</div><div>${userOffering.email}</div><div>${userOffering.contact}</div>`,
        };
        transporter.sendMail(mailOptionsDemanding, function (error, info) {
            if (error)
                console.log(error);
            else
                console.log("Email enviado: " + info.response);
        });
        //Mail para el offering
        const msgMailOffering = `Registramos que qures contactarte con ${userDemanding.name} por ${offeringPet.name}. Te deseamos suerte en tu interacción y te facilitamos los siguientes datos para contactarte con ${userDemanding.name}. Un saludo de parte del equipo de Mascotapp.`;
        const mailOptionsOffering = {
            from: "service.mascotapp@gmail.com",
            to: offeringMail,
            subject: "Mucha suerte en tu busqueda",
            html: `<div>${msgMailOffering}</div><div>${userDemanding.email}</div><div>${userDemanding.contact}</div>`,
        };
        transporter.sendMail(mailOptionsOffering, function (error, info) {
            if (error)
                console.log(error);
            else
                console.log("Email enviado: " + info.response);
        });
    });
}
//------  RUTAS: -----------------------------------------------
router.get("/allTransactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /transactions/allTransactions`);
    try {
        let allTransactions = yield getAllTransactions();
        return res.status(200).send(allTransactions);
    }
    catch (error) {
        console.log(`Error en /transactions/allTransactions`);
        return res.status(404).send(error.message);
    }
}));
router.get("/transactionsCompleted", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /transactions/transactionsCompleted`);
    try {
        const transactionsCompleted = yield index_1.default.Transaction.findAll({
            where: { status: "finalizado" },
        });
        return res.status(200).send(transactionsCompleted);
    }
    catch (error) {
        console.log(`Error en /transactions/transactionsCompleted`);
        return res.status(404).send(error.message);
    }
}));
router.post("/postSuccess", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /transactions/postsuccess`);
    try {
        const { id } = req.body;
        const { petId } = req.body;
        const { id_demanding } = req.body; // el usuario selecciona al usuario con el que realizó existosamente la transacción
        const pet = yield index_1.default.Animal.findOne({ where: { id: petId } });
        const userOffering = yield index_1.default.User.findOne({ where: { id: id } });
        const userDemanding = yield index_1.default.User.findOne({
            where: { id: id_demanding },
        });
        console.log(`pet name = ${pet === null || pet === void 0 ? void 0 : pet.name}`);
        console.log(`userOffering.name = ${userOffering === null || userOffering === void 0 ? void 0 : userOffering.name}`);
        console.log(`userDemanding.name = ${userDemanding === null || userDemanding === void 0 ? void 0 : userDemanding.name}`);
        if (!pet || !userOffering || !userDemanding) {
            console.log(+`Error en el chequeo de si alguna de las instancias buscadas en la DB es falsa. Alguna lo es`);
            throw new Error(`el pet, usserOffering o userDemanding es falso.`);
        }
        if (pet.UserId === id) {
            if (pet.status === petTypes_1.Status.enAdopcion) {
                pet.withNewOwner = "true";
                pet.postStatus = petTypes_1.postStatus.Success;
                yield pet.save();
                var multiplierPoints = yield index_1.default.Multiplier.findByPk(1);
                userDemanding.isAdopter = userDemanding.isAdopter + 1;
                userDemanding.points = Math.ceil(userDemanding.points + 100 * multiplierPoints.number);
                yield userDemanding.save();
                userOffering.gaveUpForAdoption = userOffering.gaveUpForAdoption + 1;
                userOffering.points = Math.ceil(userOffering.points + 100 * multiplierPoints.number);
                yield userOffering.save();
                console.log("se acutalizo withNewOner y postStatus de la mascota");
            }
            else {
                pet.backWithItsOwner = "true";
                pet.postStatus = petTypes_1.postStatus.Success;
                yield pet.save();
                if (pet.status === "encontrado") {
                    userDemanding.gotAPetBack = userDemanding.gotAPetBack + 1;
                    userDemanding.points = Math.ceil(userDemanding.points + 25 * multiplierPoints.number);
                    yield userDemanding.save();
                    userOffering.foundAPet = userOffering.foundAPet + 1;
                    userOffering.points = Math.ceil(userOffering.points + 100 * multiplierPoints.number);
                    yield userOffering.save();
                }
                else {
                    userDemanding.foundAPet = userDemanding.foundAPet + 1;
                    userDemanding.points = Math.ceil(userDemanding.points + 100 * multiplierPoints.number);
                    yield userDemanding.save();
                    userOffering.gotAPetBack = userOffering.gotAPetBack + 1;
                    userOffering.points = Math.ceil(userOffering.points + 25 * multiplierPoints.number);
                    yield userOffering.save();
                }
                console.log("se acutalizo backWithItsOwner y postStatus de la mascota");
            }
            const transaction = yield index_1.default.Transaction.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { user_offering_id: id },
                        { user_demanding_id: id_demanding },
                        { pet_id: petId },
                    ],
                },
            });
            transaction.status = transactionTypes_1.transactionStatus.Success;
            if (transaction.user_demanding_check !== "calificado") {
                transaction.user_demanding_check = "finalizado";
            }
            if (transaction.user_offering_check !== "calificado") {
                transaction.user_offering_check = "finalizado";
            }
            yield transaction.save();
            console.log("transactionStatus seteada a concretado");
            const transactionsToCancel = yield index_1.default.Transaction.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        { pet_id: petId },
                        { user_demanding_id: { [sequelize_1.Op.not]: id_demanding } },
                    ],
                },
            });
            console.log("transacciones a cancelar");
            console.log(transactionsToCancel);
            for (const transaction of transactionsToCancel) {
                transaction.status = transactionTypes_1.transactionStatus.Cancel;
                if (transaction.user_demanding_check !== "calificado") {
                    transaction.user_demanding_check = "finalizado";
                }
                if (transaction.user_offering_check !== "calificado") {
                    transaction.user_offering_check = "finalizado";
                }
                yield transaction.save();
                console.log("transaction saved");
            }
            console.log("transacciones a cancelar, canceladas");
            return res.send({
                msg: "estados actualizados y transacciones canceladas",
            });
        }
        throw new Error("No puedes modificar el estado de esta mascota porque no eres quién la publicó.");
    }
    catch (error) {
        console.log(`Error en /transactions/postSuccess. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/cancelPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /transactions/cancelPost`);
    try {
        const { id } = req.body;
        const { petId } = req.body;
        const pet = yield index_1.default.Animal.findOne({ where: { id: petId } });
        const transactionsWithPetId = yield index_1.default.Transaction.findAll({
            where: { pet_id: petId },
        });
        if (pet.UserId === id) {
            pet.postStatus = petTypes_1.postStatus.Cancel;
            yield pet.save();
            for (const transaction of transactionsWithPetId) {
                transaction.status = transactionTypes_1.transactionStatus.Cancel;
                if (transaction.user_demanding_check !== "calificado") {
                    transaction.user_demanding_check = "finalizado";
                }
                if (transaction.user_offering_check !== "calificado") {
                    transaction.user_offering_check = "finalizado";
                }
                yield transaction.save();
                console.log(`${transaction.id} status cancelada`);
                console.log("transaction status cancelado");
            }
            console.log("se acutalizo postStatus a canceled y se cancelaron todas las transacciones de este pet");
            return res
                .status(200)
                .send({ msg: "Se cancelo la transacción correctamente." });
        }
        throw new Error("No puedes modificar el estado de esta mascota porque no eres quién la publicó.");
    }
    catch (error) {
        console.log(`Error en /Transactions/cancelPost. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/getUserTransactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /Transactions/getUserTransactions`);
    try {
        const { id } = req.body;
        const userTransactions = yield index_1.default.Transaction.findAll({
            where: {
                [sequelize_1.Op.or]: [{ user_offering_id: id }, { user_demanding_id: id }],
            },
        });
        return res.status(200).send(userTransactions);
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/newTransaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /Transactions/newTransaction`);
    try {
        const { id } = req.body;
        const { petId } = req.query;
        if (!id || !petId) {
            console.log(`req.body.id  o  req.query.petId  es falso/undefined.`);
            throw new Error(`req.body.id  o  req.query.petId  es falso/undefined.`);
        }
        const prevTransaction = yield index_1.default.Transaction.findOne({
            where: { [sequelize_1.Op.and]: [{ pet_id: petId }, { user_demanding_id: id }] },
        });
        if (prevTransaction) {
            console.log(`esta transacción ya existe por lo que no se creará`);
            res.send({ msg: "transacción ya existente" });
        }
        const userDemanding = yield index_1.default.User.findOne({ where: { id: id } });
        const offeringPet = yield index_1.default.Animal.findOne({ where: { id: petId } });
        const userOffering = yield index_1.default.User.findOne({
            where: { id: offeringPet.UserId },
        });
        if (!userDemanding || !offeringPet || !userOffering) {
            console.log(`Error al buscar por ID alguna de las instancias de userDemanding, offeringPet o userOffering. Tirando error...`);
            throw new Error(`userDemanding || offeringPet || userOffering  no se encontró en la DB.`);
        }
        if (userDemanding.id === userOffering.id) {
            console.log(`ID de usuario ofertante y demandante son iguales!!!! Error!`);
            throw new Error(`El id del userDemanding y el userOffering son iguales. No es posible crear una transacción entre el mismo usuario.`);
        }
        const newTransaction = {
            user_offering_id: userOffering.id,
            user_offering_name: userOffering.name,
            user_demanding_id: userDemanding.id,
            user_demanding_name: userDemanding.name,
            status: transactionTypes_1.transactionStatus.Active,
            pet_id: offeringPet.id,
            pet_name: offeringPet.name,
            pet_image: offeringPet.image,
            user_offering_check: undefined,
            user_demanding_check: undefined,
        };
        let validatedTransactionObj = (0, TransactionValidators_1.validateNewTransaction)(newTransaction);
        let createdTransaction = yield index_1.default.Transaction.create(validatedTransactionObj);
        console.log(`Nueva transacción creada.`);
        //mailer
        yield mailer(userDemanding, userOffering, offeringPet);
        return res
            .status(200)
            .send({ msg: "nueva transacción creada", createdTransaction });
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.put("/transactionCheck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("en la ruta /Transactions/transactionCheck");
    try {
        const { transactionId } = req.query;
        const { id } = req.body;
        const transaction = yield index_1.default.Transaction.findOne({
            where: { id: transactionId },
        });
        if (id === transaction.user_offering_id) {
            transaction.user_offering_check = "finalizado";
            yield transaction.save();
        }
        if (id === transaction.user_demanding_id) {
            transaction.user_demanding_check = "finalizado";
            yield transaction.save();
        }
        res.status(200).send({ msg: "status checked" });
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
