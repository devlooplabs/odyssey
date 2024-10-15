"use server";

import { cookies } from "next/headers";
import { Odyssey } from "./odyssey";
import stripe from "@/lib/stripe";
import { PaymentGateways, Plan } from "./types";
import { redirect } from "next/navigation";

export const paySubscription = async (gateway: PaymentGateways, plan: Plan) => {
  const jwt = cookies().get("jwt")?.value;
  if (!jwt) {
    return null;
  }

  const odyssey = new Odyssey(jwt);
  const user = await odyssey.getMe();
  if (!user || user.membership?.active) {
    return null;
  }

  let redirectUrl = null;
  if (gateway === "stripe") {
    const session = await stripe.createSession(user, plan);
    redirectUrl = session.url!;
  } else {
    redirectUrl = "";
  }

  return redirect(redirectUrl);
};
