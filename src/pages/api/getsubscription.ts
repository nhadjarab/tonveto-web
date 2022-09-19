import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method != "GET") return res.status(400);
    const { email } = req.query;

    console.log(email);

    const customer = await stripe.customers.list({
      email: email as string,
    });

    if (customer.data.length > 0) {
      const subscription = await stripe.subscriptions.list({
        customer: customer.data[0].id,
      });

      if (subscription.data.length === 0)
        return res.status(404).json({ message: "No subscription found" });
      res.json(subscription.data[0].status);
    } else {
      res.status(404).json({ message: "No subscription found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
