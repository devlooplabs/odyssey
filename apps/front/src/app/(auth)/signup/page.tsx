"use client";

import { P } from "@/components/typography/texts";
import { SignUpForm } from "./signup-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight hidden lg:block">
          Criar conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Cria sua conta e faça parte do Alta Linguagem!
        </p>
      </div>
      <SignUpForm />
      <div>
        <P size="sm">
          Já possui uma conta?
          <Button variant="link" onClick={() => router.push("/login")}>
            Faça login!
          </Button>
        </P>
      </div>
    </>
  );
}
