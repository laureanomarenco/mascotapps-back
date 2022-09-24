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
router.get('/transactionsCompleted', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /transactions/transactionsCompleted`);
    try {
        const transactionsCompleted = yield index_1.default.Transaction.findAll({ where: { status: 'finalizado' } });
        return res.status(200).send(transactionsCompleted);
    }
    catch (error) {
        console.log(`Error en /transactions/transactionsCompleted`);
        return res.status(404).send(error.message);
    }
}));
router.post('/getUserTransactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /Transactions/getUserTransactions`);
    try {
        const { id } = req.body;
        const userTransactions = yield index_1.default.Transactions.findAll({ where: {
                [sequelize_1.Op.or]: [{ user_offering_id: id }, { user_demanding_id: id }]
            } });
        return res.status(200).send(userTransactions);
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions`);
        return res.status(404).send(error.message);
    }
}));
router.post('/newTransaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /Transactions/newTransaction`);
    try {
        const { id } = req.body;
        const { petId } = req.query;
        const userDemanding = index_1.default.User.findOne({ where: { id: id } });
        const offeringPet = index_1.default.Pets.findOne({ where: { id: petId } });
        const userOffering = index_1.default.User.findOne({ where: { id: offeringPet.UserId } });
        const newTransaction = yield index_1.default.Transaction.create({
            user_offering_id: userOffering.id,
            user_demanding_id: userDemanding.id,
            status: 'active',
            pet_id: petId,
            user_offering_check: null,
            user_demanding_check: null
        });
        return res.status(200).send({ msg: 'nueva transacción creada', newTransaction });
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions`);
        return res.status(404).send(error.message);
    }
}));
router.put('/transactionCheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('en la ruta /Transactions/transactionCheck');
    try {
        const { transactionId } = req.query;
        const { id } = req.body;
        const transaction = yield index_1.default.Transaction.findOne({ where: { id: transactionId } });
        if (id === transaction.user_offering_id) {
            transaction.user_offering_check = 'finalizado';
            yield transaction.save();
            if (transaction.user_demanding_check !== null) {
                transaction.status = 'finalizado';
                yield transaction.save();
            }
        }
        if (id === transaction.user_demanding_id) {
            transaction.user_demanding_check = 'finalizado';
            yield transaction.save();
            if (transaction.user_offering_check !== null) {
                transaction.status = 'finalizado';
                yield transaction.save();
            }
        }
        res.status(200).send({ msg: 'status checked' });
    }
    catch (error) {
        console.log(`Error en /Transactions/allTransactions`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
