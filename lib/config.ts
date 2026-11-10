// Razorpay payment is ON HOLD. All payment code is kept; set
// NEXT_PUBLIC_PAYMENTS_ENABLED=true in .env to switch payment (and prices) back on.
export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";
