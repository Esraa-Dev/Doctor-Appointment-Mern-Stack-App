import { z } from "zod";
import i18n from "../i18n";

export const otpSchema = z.object({
  verifyOtp: z
    .string()
    .min(1, i18n.t("validation:otpRequired"))
    .length(6, i18n.t("validation:otpLength", { count: 6 }))
    .regex(/^\d+$/, i18n.t("validation:otpNumbersOnly")),
});

export type VerifyOtpFormData = z.infer<typeof otpSchema>;