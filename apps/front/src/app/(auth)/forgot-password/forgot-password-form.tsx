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
  ForgotPasswordModel,
  ForgotPasswordSchema,
} from "@/app/actions/auth/schemas";

export function ForgotPasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<ForgotPasswordModel>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  function onSubmit(values: ForgotPasswordModel) {
    startTransition(async () => {
      // const { user, error } = await signin(values);
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
            name="email"
            control={form.control}
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} disabled={pending} />
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
              <>Enviar</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
