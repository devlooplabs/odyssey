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
import { SignUpModel, SignUpSchema } from "@/app/actions/auth/schemas";
import { signup } from "@/app/actions";

export function SignUpForm() {
  const { onLogin } = useAuth();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<SignUpModel>({
    resolver: zodResolver(SignUpSchema),
  });

  function onSubmit(values: SignUpModel) {
    startTransition(async () => {
      const { error } = await signup(values);
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
            name="username"
            control={form.control}
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <>Criar conta</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
