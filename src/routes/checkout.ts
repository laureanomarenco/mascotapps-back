import { Router } from "express";
const express = require('express');
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


  const endpointSecret = "whsec_da7m5mm9xQTKTJOOAJ8sqa0ry0pZoriH";

  router.post('/balance', (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err: any) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'balance.available':
        const balance = event.data.object;
        // Then define and call a function to handle the event balance.available
        response.send(balance)
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  })

export default router;