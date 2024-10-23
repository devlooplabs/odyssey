import { z } from "zod";

const password = z.string().min(6).max(128);

export const SignUpSchema = z
  .object({
    email: z.string().min(1).max(128).email(),
    username: z.string().min(3).max(20),
    password: password,
    confirmPassword: password,
    redirectUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type SignUpModel = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  identifier: z.string().min(3).max(128),
  password: password,
  redirectUrl: z.string().optional(),
});

export type SignInModel = z.infer<typeof SignInSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().min(3).max(128),
});

export type ForgotPasswordModel = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    code: z.string().min(1),
    password: password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordModel = z.infer<typeof ResetPasswordSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: password,
    password: password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordModel = z.infer<typeof ChangePasswordSchema>;
