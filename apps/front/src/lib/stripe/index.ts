import { StripeClient } from "./stripe";

const secret = process.env.ODYSSEY_STRIPE_SECRET_KEY!;
const webhookSecret = process.env.ODYSSEY_STRIPE_WEBHOOK_SECRET!;

export default new StripeClient(secret, webhookSecret);