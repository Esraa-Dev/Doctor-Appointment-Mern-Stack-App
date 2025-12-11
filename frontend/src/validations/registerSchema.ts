import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "الاسم يجب أن يكون على الأقل 3 أحرف"),

    email: z
      .string()
      .email("البريد الإلكتروني غير صالح"),

    phone: z
      .string()
      .regex(/^[0-9+]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط و +")
      .min(10, "رقم الهاتف يجب أن يكون على الأقل 10 أرقام")
      .max(15, "رقم الهاتف يجب ألا يتجاوز 15 رقم"),

    password: z
      .string()
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

