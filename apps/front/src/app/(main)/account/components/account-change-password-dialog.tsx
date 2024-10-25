"use-client";

import { changePassword } from "@/app/actions";
import {
  ChangePasswordModel,
  ChangePasswordSchema,
} from "@/app/actions/auth/schemas";
import { useAuth } from "@/components/auth/auth-context";
import { LoadingSpinner } from "@/components/loading/loading-spinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export const AccountChangePasswordDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [changing, startChanging] = useTransition();
  const { onLogin } = useAuth();

  const form = useForm<ChangePasswordModel>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: ChangePasswordModel) {
    startChanging(async () => {
      const res = await changePassword(values);
      if (res.error) {
        setError(res.error.message);
      } else {
        await onLogin(false);
        setSuccess(true);
        form.setValue("currentPassword", "");
        form.setValue("password", "");
        form.setValue("passwordConfirmation", "");
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Trocar Senha</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Trocar Senha</AlertDialogTitle>
              <AlertDialogDescription>
                Escolha uma nova senha para acessar a plataforma.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2">
              <FormField
                name="currentPassword"
                control={form.control}
                disabled={changing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha atual</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                disabled={changing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
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
                disabled={changing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua nova senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="mr-2 text-red-700 text-sm text-center">{error}</div>
              )}
              {success && (
                <div className="mr-2 text-green-700 text-sm text-center">Senha alterada com sucesso!</div>
              )}
            </div>
            <AlertDialogFooter className="mt-2">
              <AlertDialogCancel disabled={changing}>
                Cancelar
              </AlertDialogCancel>
              <Button type="submit" disabled={changing}>
                {changing ? <LoadingSpinner /> : "Trocar"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
