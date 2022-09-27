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
        if (offeringPet.wasTransacted !== "false") {
            console.log(`offeringPet.wasTransacted === "true" ! Error!`);
            throw new Error(`Esta mascota no está disponible ya que ya es parte de una transacción. Lo sentimos mucho :( )`);
        }
        const newTransaction = {
            user_offering_id: userOffering.id,
            user_offering_name: userOffering.name,
            user_demanding_id: userDemanding.id,
            user_demanding_name: userDemanding.name,
            status: "active",
            pet_id: offeringPet.id,
            pet_name: offeringPet.name,
            pet_image: offeringPet.image,
            user_offering_check: undefined,
            user_demanding_check: undefined,
        };
        let validatedTransactionObj = (0, TransactionValidators_1.validateNewTransaction)(newTransaction);
        let createdTransaction = yield index_1.default.Transaction.create(validatedTransactionObj);
        console.log(`Nueva transacción creada. Seteando la mascota a wasTransacted = "true"...`);
        offeringPet.wasTransacted = "true";
        offeringPet.save();
        console.log(`Mascota seteada a wasTransacted = "true".`);
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
            if (transaction.user_demanding_check !== null) {
                transaction.status = "finalizado";
                yield transaction.save();
                console.log(`Transaction.status ahora es "finalizado".`);
            }
        }
        if (id === transaction.user_demanding_id) {
            transaction.user_demanding_check = "finalizado";
            yield transaction.save();
            if (transaction.user_offering_check !== null) {
                transaction.status = "finalizado";
                yield transaction.save();
                console.log(`Transaction.status ahora es "finalizado".`);
            }
        }
        res.status(200).send({ msg: "status checked" });
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
