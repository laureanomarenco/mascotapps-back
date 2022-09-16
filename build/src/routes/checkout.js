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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Stripe = require('stripe');
//const stripe = require('../app')
const router = (0, express_1.Router)();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../../config/config.js")[env];
let stripe;
if (config.stripeKeyProd) {
    stripe = new Stripe(process.env[config.stripeKeyProd]);
}
else {
    stripe = new Stripe(config.stripeKey);
}
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, amount } = req.body;
        const payment = yield stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Donation",
            payment_method: id,
            confirm: true
        });
        console.log(payment);
        res.send({ msg: 'Succesfull payment' });
    }
    catch (err) {
        res.json({ msg: err.raw.message });
    }
}));
exports.default = router;
