"use server";

import qs from "qs";
import { cookies } from "next/headers";
import { SignInModel, SignUpModel } from "./schemas";
import { TokenResult, User } from "./types";
import { getOdysseyClient } from "../client";
import { JWT_COOKIE_NAME } from "@/lib/auth";

export async function signup(model: SignUpModel) {
  const client = getOdysseyClient();
  const url = "/api/auth/local/register";
  const res = await client.post<TokenResult>(url, {
    email: model.email,
    username: model.username,
    password: model.password,
  });

  if (res.data.jwt) {
    cookies().set(JWT_COOKIE_NAME, res.data.jwt);
    // if (model.redirectUrl) return redirect(model.redirectUrl);
    // return redirect("/");
  }

  return res.data;
}

export async function login(model: SignInModel) {
  const client = getOdysseyClient();
  const url = "/api/auth/local";
  const res = await client.post<TokenResult>(url, {
    identifier: model.identifier,
    password: model.password,
  });

  if (res.data.jwt) {
    cookies().set(JWT_COOKIE_NAME, res.data.jwt);
    // if (model.redirectUrl) return redirect(model.redirectUrl);
    // return redirect("/");
  }

  return res.data;
}

export async function logout() {
  cookies().delete(JWT_COOKIE_NAME);
}

export async function getMe() {
  var token = cookies().get(JWT_COOKIE_NAME);
  if (!token) return { user: null };

  const client = getOdysseyClient();
  const query = qs.stringify({ populate: ["role" ] });
  const url = `/api/users/me?${query}`;
  const res = await client.get<User>(url);
  return { user: res.data };
}
