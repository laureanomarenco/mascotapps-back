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
const { GMAIL_PASS, GMAIL_USER } = process.env;
const route = (0, express_1.Router)();
route.get("/addVisitor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a /visitor`);
    try {
        let newVisitor = {
            id: undefined,
        };
        let newVisit = yield index_1.default.Visitor.create(newVisitor);
        console.log(`Visita registrada en la DB`);
        res.send(newVisit + "juka puto");
    }
    catch (error) {
        console.log(`Error en /visitor/`);
        return error.message;
    }
}));
route.get("/numbervisitors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
route.post('/mailAdmin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, comment } = req.body;
    const nodemailer = require('nodemailer');
    console.log(GMAIL_PASS, GMAIL_USER);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });
    const mailOptions = {
        from: email,
        to: 'service.mascotapp@gmail.com',
        subject: 'Consulta sobre la página',
        html: comment
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            console.log(error);
        else
            console.log('Email enviado: ' + info.response);
    });
}));
exports.default = route;
