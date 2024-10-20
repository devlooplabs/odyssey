import { User } from "@/app/actions/auth/types";
import { PaymentGateways, Plan, PlanPaymentOption } from "@/app/actions/plans/types";
import Stripe from "stripe";

export class StripeClient {
  private client: Stripe;
  private webhookSecret: string;

  constructor(secret: string, webhookSecret: string) {
    this.client = new Stripe(secret, { apiVersion: "2024-09-30.acacia" });
    this.webhookSecret = webhookSecret;
  }

  private async createSubscriptionSession(
    user: User,
    option: PlanPaymentOption
  ) {
    return await this.client.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: option.data.price,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/checkout?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/checkout?status=failure`,
      client_reference_id: user.documentId,
      customer_email: user.email,
      currency: "brl",
    });
  }

  async createSession(user: User, plan: Plan) {
    const option = plan.paymentOptions.find(
      (option) => option.gateway === PaymentGateways.stripe
    );
    if (!option) throw new Error("Plan doesn't have a Stripe payment option.");

    const session = await this.createSubscriptionSession(user, option);
    if (!session.url) throw new Error("Couldn't get session URL.");

    return session;
  }

  async constructEvent(body: string, signature: string) {
    return await this.client.webhooks.constructEventAsync(
      body,
      signature,
      this.webhookSecret
    );
  }
}
