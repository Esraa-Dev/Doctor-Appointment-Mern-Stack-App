import { z } from "zod";
import i18n from "../i18n";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email(i18n.t("validation:invalidEmail")),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;