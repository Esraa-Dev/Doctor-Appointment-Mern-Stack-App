import { z } from "zod";

export const otpSchema = z.object({
  verifyOtp: z
    .string()
    .length(6, "الرجاء إدخال الرمز المكون من 6 أرقام")
    .regex(/^\d{6}$/, "يجب أن يتكون الرمز من أرقام فقط"),
});

export type VerifyOtpFormData = z.infer<typeof otpSchema>;