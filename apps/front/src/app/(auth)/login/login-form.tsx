"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { P } from "@/components/typography/texts";
import Link from "next/link";
import { login } from "@/app/actions";
import { SignInModel, SignInSchema } from "@/app/actions/auth/schemas";

export function SignInForm() {
  const { onLogin } = useAuth();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<SignInModel>({
    resolver: zodResolver(SignInSchema),
  });

  function onSubmit(values: SignInModel) {
    startTransition(async () => {
      const { error } = await login(values);
      if (error) {
        setError(error.message);
      } else {
        await onLogin();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            name="identifier"
            control={form.control}
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário ou E-mail</FormLabel>
                <FormControl>
                  <Input {...field} disabled={pending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={pending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <P size="sm">
            Esqueceu sua senha?{" "}
            <Link href="/forgot-password">Clique aqui!</Link>{" "}
          </P>
          {error && (
            <div className="text-red-700 text-sm text-center">{error}</div>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={pending}
            size="lg"
            className="text-lg font-semibold"
          >
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Entrar</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
