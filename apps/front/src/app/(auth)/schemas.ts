import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().min(1).max(128).email(),
    username: z.string().min(3).max(20),
    password: z.string().min(12).max(128),
    confirmPassword: z.string().min(12).max(128),
    redirectUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type SignUpModel = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  identifier: z.string().min(3).max(128),
  password: z.string().min(12).max(128),
  redirectUrl: z.string().optional(),
});

export type SignInModel = z.infer<typeof SignInSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().min(3).max(128),
});

export type ForgotPasswordModel = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(12).max(128),
    confirmPassword: z.string().min(12).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

  
export type ResetPasswordModel = z.infer<typeof ResetPasswordSchema>;
