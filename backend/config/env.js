// Boot-time environment validation. Fail fast on a misconfigured deploy so a
// missing secret surfaces at startup instead of as a confusing 500 on the
// first request that needs it. Never logs secret VALUES — only key names.

// Required for the app to function at all today.
const REQUIRED = ["MONGO_URI", "JWT_SECRET"];

// Required only once the paywall is live (validated lazily by requireStripeEnv
// so the rest of the API still boots if Stripe isn't configured yet).
const STRIPE_REQUIRED = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_PRO_MONTHLY",
  "STRIPE_PRICE_PRO_QUARTERLY",
  "STRIPE_PRICE_PRO_YEARLY",
];

function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
    throw new Error("Invalid environment configuration");
  }
}

// Call from the Stripe/billing module so checkout/webhook fail fast (and clearly)
// rather than hitting a runtime "No such price" deep inside a Stripe call.
function requireStripeEnv() {
  const missing = STRIPE_REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(
      `Missing Stripe environment variables: ${missing.join(", ")}`,
    );
  }
}

module.exports = { validateEnv, requireStripeEnv, REQUIRED, STRIPE_REQUIRED };
