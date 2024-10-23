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
import {
  ResetPasswordModel,
  ResetPasswordSchema,
} from "@/app/actions/auth/schemas";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions";
import { useAuth } from "@/components/auth/auth-context";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const { onLogin } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      form.setValue("code", code);
    }
  }, [searchParams]);

  const form = useForm<ResetPasswordModel>({
    resolver: zodResolver(ResetPasswordSchema),
    values: {
      code: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: ResetPasswordModel) {
    startTransition(async () => {
      startTransition(async () => {
        const { error } = await resetPassword(values);
        if (error) {
          setError(error.message);
        } else {
          await onLogin();
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => <Input type="hidden" {...field} />}
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
            name="passwordConfirmation"
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
