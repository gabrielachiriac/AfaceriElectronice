import Stripe from "stripe";
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

const stripeSecret = process.env.STIPRE_PRIVATE_KEY;

router.post('/api/checkout', async (req, res) => {
    const stripe = new Stripe(stripeSecret);

    try{
      const products = req.body.products;

      const extractProducts = await products.map((product) => ({
        quantity: product.quntity,
        price_data: {
          currency: "usd",
          unit_amount: product.price*100,
          product_data:{
            name: product.title,
            image: product.thumbnail,
          },
        },
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: extractProducts,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout-fail`,
      });

      res.json({id: session.id });
    } catch (error) {
      res.status(500).json({ error:error });
    }
  });
  //    res.send({url: session.url});
  export default router;