import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
import Stripe from "stripe";

type StripeKey = string;

const stripeSecretKey: StripeKey = process.env.STRIPE_KEY || "";

const stripe = new Stripe(stripeSecretKey);

export const payment = async (req: Request, res: Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment sheet:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const validPayment = async (req: Request, res: Response) => {
  try {
    const result = await prisma.payment.createMany({
      data: req.body,
    });
    res.status(200).send("valid payment");
  } catch (err) {
    res.status(400).send(err);
  }
};
