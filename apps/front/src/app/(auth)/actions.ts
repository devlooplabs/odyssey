"use server";

import { redirect } from "next/navigation";
import { SignInModel, SignUpModel } from "./schemas";
import { cookies } from "next/headers";
import { Odyssey } from "@/lib/odyssey/odyssey";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

interface AuthActionResult {
  success: boolean;
  jwt?: string;
  error?: string;
}

const odyssey = new Odyssey();

export async function signup(model: SignUpModel): Promise<AuthActionResult> {
  // TODO: Validate model.

  const resp = await odyssey.register({
    email: model.email,
    username: model.username,
    password: model.password,
  });

  if (!resp || resp.error) {
    return {
      success: false,
      error:
        resp?.error?.message ||
        "Ops! Tivemos um problema ao realizar o seu cadastro. Tente novamente mais tarde.",
    };
  }

  cookies().set("jwt", resp.jwt, config);
  
  if (model.redirectUrl) {
    return redirect(model.redirectUrl);
  }

  return redirect("/");
}

export async function signin(model: SignInModel): Promise<AuthActionResult> {
  // TODO: Validate model.

  const result = await odyssey.getToken({
    identifier: model.identifier,
    password: model.password,
  });

  if (!result || result.error) {
    return {
      success: false,
      error:
        result?.error?.message ||
        "Ops! Não foi possível realizar o seu login. Tente novamente mais tarde.",
    };
  }

  cookies().set("jwt", result.jwt, config);

  if (model.redirectUrl) {
    return redirect(model.redirectUrl);
  }

  return redirect("/");
}

export async function logout() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/signin");
}
