"use server";

import { cookies } from "next/headers";
import { Odyssey } from "./odyssey";

export const getPlan = async (planId: string) => {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getPlan(planId);
  return res.data;
};

export const getPlans = async () => {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getPlans();
  return res.data;
}