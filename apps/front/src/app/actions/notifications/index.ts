"use server";

import { getOdysseyClient } from "../client";
import { NotificationsResult } from "./types";

export async function subscribeMeToPush(subscription: PushSubscription) {
  const client = getOdysseyClient();
  const url = "/api/notifications/subscribe";
  const res = await client.put<NotificationsResult>(url, { subscription });
  return res.data;
}

export async function unsubscribeMeFromPush() {
  const client = getOdysseyClient();
  const url = "/api/notifications/unsubscribe";
  const res = await client.put<NotificationsResult>(url);
  return res.data;
}
