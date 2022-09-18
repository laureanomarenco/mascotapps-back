import { Router } from "express";
import db from "../../models";
const Stripe = require('stripe')
//const stripe = require('../app')
const router = Router();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../../config/config.js")[env];

let stripe: any;
if(config.stripeKeyProd){
    stripe = new Stripe(process.env[config.stripeKeyProd])
} else {
    stripe = new Stripe(config.stripeKey)
}

const getAllDonations = async () => {
    try {
      const allDonations = await db.Donation.findAll();
      // console.log(allPets);
      return allDonations;
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  };

router.post('/', async (req, res) => {
    console.log('EN LA RUTA POST DE CHECKOUT')
    console.log(req.body)
    try {
        const { id, amount, email } = req.body
        
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Donation",
            payment_method: id,
            confirm: true
        })
        console.log('payment: '+ payment)
        const donation = await db.Donation.create({
            id,
            amount,
            email
        })
        console.log('donation: ' + donation)
        res.send({msg: 'Succesfull payment'})

    } catch(err: any){
        console.log('error en /checkout')
        res.json({msg: err.raw.message})
    }
})

router.get('/balance', async (req, res) => {
    console.log('ENTRE A LA RUTA BALANCE')
    try {
        let allTheDonations = await getAllDonations();
        console.log('All the donations: ' + allTheDonations)
        return res.status(200).send(allTheDonations);
      } catch (error: any) {
        console.log('error en /balance')
        return res.status(404).send(error.message);
      }
})
export default router;