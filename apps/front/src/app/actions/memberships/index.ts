"use server";

import { cookies } from "next/headers";
import { getOdysseyClient } from "../client";
import { PaymentGateways, Plan } from "../plans/types";
import { ActivateMembershipParams, Membership } from "./types";
import { getMe } from "../auth";
import stripe from "@/lib/stripe";
import { redirect } from "next/navigation";
import { JWT_COOKIE_NAME } from "@/lib/auth";

export async function activateMembership(
  userId: string,
  params: ActivateMembershipParams
) {
  const client = getOdysseyClient();
  const url = `/api/membership/${userId}/activate`;
  const res = await client.put<Membership>(url, params);
  return res.data;
}

export async function revokeMembership(userId: string) {
  const client = getOdysseyClient();
  const url = `/api/membership/${userId}/revoke`;
  const res = await client.put<Membership>(url, {});
  return res.data;
}

export async function revokeGatewayMembership(gatewayId: string) {
  const client = getOdysseyClient();
  const url = `/api/membership/${gatewayId}/revoke-gateway`;
  const res = await client.put<Membership>(url, {});
  return res.data;
}

export const payMembership = async (gateway: PaymentGateways, plan: Plan) => {
  const jwt = cookies().get(JWT_COOKIE_NAME)?.value;
  if (!jwt) {
    return null;
  }

  const { user } = await getMe();
  if (!user || user.member) {
    return null;
  }

  let redirectUrl = null;
  if (gateway === "stripe") {
    const session = await stripe.createSession(user, plan);
    console.log(session);
    redirectUrl = session.url!;
  } else {
    redirectUrl = "";
  }

  return redirect(redirectUrl);
};
