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
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../../config/config.js")[env];
const { GMAIL_PASS, GMAIL_USER, STRIPE_KEY } = process.env;
const admin_1 = require("./admin");
const express_1 = require("express");
const models_1 = __importDefault(require("../../models"));
const Stripe = require('stripe');
const router = (0, express_1.Router)();
let stripe;
stripe = new Stripe(STRIPE_KEY);
const getAllDonations = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('en function getAllDonations');
    try {
        const allDonations = yield models_1.default.Donation.findAll();
        return allDonations;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('EN LA RUTA POST DE CHECKOUT');
    console.log(req.body);
    try {
        const { id, amount, email } = req.body;
        const user = yield models_1.default.User.findOne({ where: { email: email } });
        user.points = user.points + (100 * admin_1.multiplierPoints);
        yield user.save();
        //DONACIÓN
        const payment = yield stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Donation",
            payment_method: id,
            confirm: true
        });
        console.log('payment: ' + payment);
        const donation = yield models_1.default.Donation.create({
            id,
            amount,
            email
        });
        // MAILER
        const nodemailer = require('nodemailer');
        console.log(GMAIL_PASS, GMAIL_USER);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            }
        });
        const msgMail = `Te damos profundas gracias desde Mascotapp por colaborar. Nuestro proyecto necesita de las financiación de los usuarios por lo cual tu aporte es muy importante.`;
        const mailOptions = {
            from: 'service.mascotapp@gmail.com',
            to: email,
            subject: 'Donación recibida!',
            html: `<div>${msgMail}</div><div>Monto donado: ${amount / 100} USD</div><div>ID de la transferencia: ${id}</div>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.log(error);
            else
                console.log('Email enviado: ' + info.response);
        });
        //CHECK USER
        if (user) {
            yield donation.setUser(user.id);
            yield models_1.default.User.update({ isDonator: "true" }, { where: { id: user.id } });
            return res.send({ msg: 'Succesfull payment from', user });
        }
        else {
            console.log('donation: ' + donation);
            return res.send({ msg: 'Succesfull payment' });
        }
    }
    catch (err) {
        console.log('error en /checkout');
        return res.json({ msg: err.raw.message });
    }
}));
router.get('/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ENTRE A LA RUTA BALANCE');
    try {
        let allTheDonations = yield getAllDonations();
        console.log('All the donations: ' + allTheDonations);
        return res.status(200).send(allTheDonations);
    }
    catch (error) {
        console.log('error en /balance');
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
