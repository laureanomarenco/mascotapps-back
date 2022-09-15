import { Router } from "express";
const Stripe = require('stripe')
//const stripe = require('../app')
const router = Router();

const stripe = new Stripe(process.env.STRIPE_KEY)

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