import { NextApiResponse, NextApiRequest } from "next";
import Stripe from "stripe";

console.log("Stripe secret key exists:", !!process.env.STRIPE_SECRET_KEY);
console.log("Stripe secret key starts with sk_:", process.env.STRIPE_SECRET_KEY?.startsWith('sk_'));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: "2023-10-16" as any  
});

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse  
) {
  console.log("API called with method:", req.method);
  
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      console.log("Received amount:", amount);
      
      if (!amount || amount <= 0) {
        console.log("Invalid amount detected");
        return res.status(400).json({ error: "Invalid amount" });
      }

      console.log("About to create payment intent...");
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "usd",
      });
      
      console.log("Payment intent created successfully:", paymentIntent.id);
      
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Detailed error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(500).json({ error: "Failed to create payment intent", details: error instanceof Error ? error.message : String(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}