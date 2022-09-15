import { Router } from "express";
const Stripe = require('stripe')
//const stripe = require('../app')
const router = Router();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../../config/config.js")[env];

const stripe = new Stripe(config.stripeKey)

router.post('/', async (req, res) => {
    try {
        const { id, amount } = req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Donation",
            payment_method: id,
            confirm: true
        })
        console.log(payment)
        res.send({msg: 'Succesfull payment'})

    } catch(err: any){
        res.json({msg: err.raw.message})
    }
})

export default router;