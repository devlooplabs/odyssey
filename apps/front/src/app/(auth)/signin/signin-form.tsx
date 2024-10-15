"use client";
import { useEffect, useState, useTransition } from "react";
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
import { signin } from "../actions";
import { SignInModel, SignInSchema } from "../schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onSignIn } = useAuth();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<SignInModel>({
    resolver: zodResolver(SignInSchema),
  });

  function onSubmit(values: SignInModel) {
    startTransition(async () => {
      const result = await signin(values);
      if (result.success) {
        onSignIn();
        router.push("/");
      } else {
        setError(result.error);
      }
    });
  }

  useEffect(() => {
    const redirectUrl = searchParams.get("redirectUrl");
    if (redirectUrl) {
      form.setValue("redirectUrl", redirectUrl);
    }
  }, [searchParams, form.setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="redirectUrl"
          control={form.control}
          render={({ field }) => <Input {...field} type="hidden" />}
        />
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
        {error && (
          <div className="text-red-700 text-sm text-center">{error}</div>
        )}
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
}
