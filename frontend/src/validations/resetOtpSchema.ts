import { z } from "zod";

export const resetOtpSchema = z.object({
  resetPasswordOtp: z
    .string()
    .length(6, "الرجاء إدخال الرمز المكون من 6 أرقام")
    .regex(/^\d{6}$/, "يجب أن يتكون الرمز من أرقام فقط"),
});

export type ResetOtpFormData = z.infer<typeof resetOtpSchema>;
