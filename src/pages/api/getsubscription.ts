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

      if (subscription.data.length === 0) return res.json("null");

      let subscriptionObject = {
        monthly: false,
        yearly: false,
      };

      subscription.data.forEach((sub) => {
        console.log("=============================");
        console.log(sub.items.data[0].price.product , sub.status);
        console.log(process.env.PRODUCT_ID)
        console.log("=============================");
        if (
          sub.items.data[0].price.product === process.env.PRODUCT_ID &&
          sub.status === "active"
        )
          subscriptionObject.monthly = true;
        if (
          sub.items.data[0].price.product === process.env.PRODUCT_ID_YEARLY &&
          sub.status === "active"
        )
          subscriptionObject.yearly = true;
      });

      console.log(subscriptionObject);

      res.json(subscriptionObject);
    } else {
      res.json("null");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
