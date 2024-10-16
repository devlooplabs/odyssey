"use client";

import { Button } from "@/components/ui/button";
import { SignInForm } from "./signin-form";
import { P } from "@/components/typography/texts";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight hidden lg:block">
          Entrar
        </h1>
        <p className="text-sm text-muted-foreground">
          Entre com a suas credenciais ou crie uma nova conta.
        </p>
      </div>
      <SignInForm />
      <div>
        <P size="sm">
          Novo por aqui?
          <Button variant="link" onClick={() => router.push("/signup")}>
            Assine AGORA!
          </Button>
        </P>
      </div>
    </>
  );
}
