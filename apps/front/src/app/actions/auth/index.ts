"use server";

import qs from "qs";
import { cookies } from "next/headers";
import {
  ChangePasswordModel,
  ForgotPasswordModel,
  ResetPasswordModel,
  SignInModel,
  SignUpModel,
} from "./schemas";
import { ForgotPasswordResult, TokenResult, User } from "./types";
import { getOdysseyClient } from "../client";
import { JWT_COOKIE_NAME } from "@/lib/auth";
import { OdysseyBaseResponse } from "../types";
import { redirect } from "next/navigation";

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
  }

  return res.data;
}

export async function logout() {
  cookies().delete(JWT_COOKIE_NAME);
  return redirect("/");
}

export async function getMe() {
  var token = cookies().get(JWT_COOKIE_NAME);
  if (!token) return { user: null };

  const client = getOdysseyClient();
  const query = qs.stringify({
    populate: {
      role: true,
      plan: true,
    },
  });
  const url = `/api/users/me?${query}`;
  const res = await client.get<User>(url);
  return { user: res.data };
}

export async function forgotPassword(model: ForgotPasswordModel) {
  const client = getOdysseyClient();
  const res = await client.post<ForgotPasswordResult>(
    "/api/auth/forgot-password",
    model
  );

  return res.data;
}

export async function resetPassword(model: ResetPasswordModel) {
  const client = getOdysseyClient();
  const res = await client.post<TokenResult>("/api/auth/reset-password", model);

  if (res.data.jwt) {
    cookies().set(JWT_COOKIE_NAME, res.data.jwt);
  }

  return res.data;
}

export async function changePassword(model: ChangePasswordModel) {
  const client = getOdysseyClient();
  const res = await client.post<TokenResult>("/api/auth/change-password", model);

  if (res.data.jwt) {
    cookies().set(JWT_COOKIE_NAME, res.data.jwt);
  }

  return res.data;
}
