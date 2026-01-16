import { z } from "zod";
import i18n from "../i18n";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, i18n.t("validation:minLength", { count: 6 })),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t("validation:passwordMismatch"),
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;