import Stripe from "stripe";

// Lazy initialization — only throws at runtime when actually called,
// not at build time. This allows Vercel to build without STRIPE_SECRET_KEY set.
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true });
}


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
