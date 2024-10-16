"use server";

import { redirect } from "next/navigation";
import { SignInModel, SignUpModel } from "./schemas";
import { cookies } from "next/headers";
import { Odyssey } from "@/lib/odyssey/odyssey";
import { cookieConfig } from "@/lib/auth/utils";

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

  cookies().set("jwt", resp.jwt, cookieConfig);
  
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

  cookies().set("jwt", result.jwt, cookieConfig);

  if (model.redirectUrl) {
    return redirect(model.redirectUrl);
  }

  return redirect("/");
}
