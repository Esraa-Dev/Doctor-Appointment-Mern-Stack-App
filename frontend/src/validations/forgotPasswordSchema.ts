import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
