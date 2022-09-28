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
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/mutateActiveToActivo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a /admin/mutateActiveToActivo`);
    let password = req.body.password;
    if (password != process.env.ADMIN_PASSWORD) {
        throw new Error(`La password de administrador no es válida`);
    }
    try {
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
