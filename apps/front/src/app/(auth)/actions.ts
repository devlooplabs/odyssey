"use server";

import { redirect } from "next/navigation";
import { SignInModel, SignUpModel } from "./schemas";
import { cookies } from "next/headers";
import { Odyssey } from "@/lib/odyssey/odyssey";
import { cookieConfig } from "@/lib/auth/utils";
import { User } from "@/lib/odyssey/types";

interface AuthActionResult {
  user: User | null;
  success: boolean;
  error?: string;
}

const odyssey = new Odyssey();

export async function signup(model: SignUpModel): Promise<AuthActionResult> {
  // TODO: Validate model.

  const result = await odyssey.register({
    email: model.email,
    username: model.username,
    password: model.password,
  });

  if (!result || result.error) {
    return {
      user: null,
      success: false,
      error:
        result?.error?.message ||
        "Ops! Tivemos um problema ao realizar o seu cadastro. Tente novamente mais tarde.",
    };
  }

  cookies().set("jwt", result.jwt, cookieConfig);

  return { user: result.user, success: true };
}

export async function signin(model: SignInModel): Promise<AuthActionResult> {
  // TODO: Validate model.

  const result = await odyssey.getToken({
    identifier: model.identifier,
    password: model.password,
  });

  if (!result || result.error) {
    return {
      user: null,
      success: false,
      error:
        result?.error?.message ||
        "Ops! Não foi possível realizar o seu login. Tente novamente mais tarde.",
    };
  }

  cookies().set("jwt", result.jwt, cookieConfig);

  return { user: result.user, success: true };
}
