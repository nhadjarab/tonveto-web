// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method != "POST") return res.status(400);
    const { name, email, paymentMethod } = req.body;

    let customer;

    const customers = await stripe.customers.list({
      email: email as string,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Create a customer
      customer = await stripe.customers.create({
        email,
        name,
        payment_method: paymentMethod,
        invoice_settings: { default_payment_method: paymentMethod },
      });
    }

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "eur",
            product: process.env.PRODUCT_ID_YEARLY as string,
            unit_amount: 200,
            recurring: {
              interval: "year",
            },
          },
        },
      ],

      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    // Send back the client secret for payment
    res.json({
      message: "Subscription successfully initiated",
      clientSecret: subscription.latest_invoice!.payment_intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
