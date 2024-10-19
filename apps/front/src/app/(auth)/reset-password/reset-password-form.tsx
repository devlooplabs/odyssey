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
import {
  ResetPasswordModel,
  ResetPasswordSchema,
} from "@/app/actions/auth/schemas";

export function ResetPasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<ResetPasswordModel>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  function onSubmit(values: ResetPasswordModel) {
    startTransition(async () => {
      // const { user, error } = await signup(values);
      // if (user) {
      //   await onLogin();
      // } else {
      //   setError(error);
      // }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
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
              <>Trocar senha</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
