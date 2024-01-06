import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

import stripeLib from "stripe";

const prisma = new PrismaClient();
const stripeSecretKey = process.env.STRIPE_KEY || " sk_test_51OUFLqLxTXlxxAPII2BUdD5JyMjV1pnDQscQmJxMIQSMdS3XNfnjZNkee8QsMmU9H84GTPxgaRt7PhzXv1cbTF0g004qXYPtIO"

const stripe = new stripeLib(stripeSecretKey);

export const router = express.Router();

router.post('/payment-sheet', async (req: Request, res: Response) => {
  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'eur',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,

      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:process.env.PUBLISH_KEY, // Replace with your actual publishable key
    });
  } catch (error) {
    console.error("Error creating payment sheet:", error);
    res.status(500).send("Internal Server Error");
  }
});

