const express = require("express");
const Stripe = require("stripe");

const dotenv = require("dotenv");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Cheia secreta Stripe
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body; // Extragem produsele din body

  try {
    // Crearea unei sesiuni de checkout Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: product.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.thumbnail],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-fail`,
    });

    res.json({ id: session.id });
    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session." });
  }
});

module.exports = router;
