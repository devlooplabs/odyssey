"use server";

import { getOdysseyClient } from "../client";
import { OdysseyFindResponse } from "../types";
import { Plan } from "./types";

export async function findPlan(id: string) {
  const client = getOdysseyClient();
  const url = `/api/plans/${id}?populate=paymentOptions`;
  const res = await client.get<OdysseyFindResponse<Plan>>(url);
  return res.data;
}

export async function findPlans() {
  const client = getOdysseyClient();
  const url = "/api/plans?populate[0]=paymentOptions&populate[1]=role";
  const res = await client.get<OdysseyFindResponse<Plan[]>>(url);
  return res.data;
}
