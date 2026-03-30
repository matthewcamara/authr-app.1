import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});


// Plan configuration — single plan for beta, scalable to tiers later
export const PLANS = {
  beta: {
    name: "Authr Beta",
    price: 1500, // $15.00 in cents
    trialDays: 14,
    features: [
      "Unlimited books",
      "AI-powered analytics",
      "Reviewer CRM",
      "Automations",
      "AI Chat Assistant",
      "Data Import",
    ],
  },
} as const;
