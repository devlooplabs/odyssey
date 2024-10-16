"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { User } from "../odyssey/types";
import { Odyssey } from "../odyssey/odyssey";
import { cookieConfig } from "./utils";

interface AuthResult {
  user: User | null;
}

export const getAuth = cache(async (): Promise<AuthResult> => {
  const jwt = cookies().get("jwt")?.value;
  if (!jwt) return { user: null };

  const odyssey = new Odyssey(jwt);
  const user = await odyssey.getMe();

  return { user };
});

export async function logout() {
  cookies().set("jwt", "", { ...cookieConfig, maxAge: 0 });
}