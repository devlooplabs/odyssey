"use server";

import { cookies } from "next/headers";
import { PaymentGateways, Plan } from "../plans/types";
import { JWT_COOKIE_NAME } from "@/lib/auth";
import { getMe } from "../auth";
import stripe from "@/lib/stripe";
import { redirect } from "next/navigation";
import { User } from "../auth/types";
import { Payment } from "./types";
import { getOdysseyClient } from "../client";
import { OdysseyBaseResponse } from "../types";

interface PaymentLinkResult {
  success: boolean;
  error: string;
}

export async function createPayment(
  plan: Plan,
  gateway: PaymentGateways
): Promise<PaymentLinkResult> {
  const jwt = cookies().get(JWT_COOKIE_NAME)?.value;
  if (!jwt) {
    return { success: false, error: "User isn't authenticated." };
  }

  const { user } = await getMe();
  if (!user || user.member) {
    return { success: false, error: "User is a member already." };
  }

  let payment;
  switch (gateway) {
    case PaymentGateways.stripe:
      payment = await handleStripe(user, plan);
      break;
    default:
      return { success: false, error: "Payment method not supported." };
  }

  // Get admin client.
  const client = getOdysseyClient(process.env.ODYSSEY_STRAPI_TOKEN);
  const url = "/api/payments?populate=user";
  const res = await client.post<OdysseyBaseResponse<Payment>>(url, {
    data: {
      user: user.documentId,
      plan: plan.documentId,
      gateway: payment.gateway,
      externalId: payment.externalId,
      url: payment.url,
    },
  });

  if (res.data.error) {
    return { success: false, error: res.data.error.message };
  }

  return redirect(payment.url);
}

async function handleStripe(user: User, plan: Plan): Promise<Payment> {
  const session = await stripe.createSession(user, plan);
  const payment = {
    user: user,
    gateway: PaymentGateways.stripe,
    externalId: session.id,
    url: session.url,
    confirmed: false,
  } as Payment;

  return payment;
}
