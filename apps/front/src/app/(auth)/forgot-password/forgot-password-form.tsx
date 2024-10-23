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
import { Check, Loader2 } from "lucide-react";
import {
  ForgotPasswordModel,
  ForgotPasswordSchema,
} from "@/app/actions/auth/schemas";
import { forgotPassword } from "@/app/actions";

export function ForgotPasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<Boolean>();

  const form = useForm<ForgotPasswordModel>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordModel) {
    startTransition(async () => {
      const res = await forgotPassword(values);
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(res.error?.message || "Ocorreu um erro ao realizar a ação.");
      }
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
                  <Input {...field} />
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
            disabled={pending || !!success}
            size="lg"
            className="text-lg font-semibold"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : success ? (
              <>
                <Check className="h-6 w-6 mr-2" /> Email enviado!
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
