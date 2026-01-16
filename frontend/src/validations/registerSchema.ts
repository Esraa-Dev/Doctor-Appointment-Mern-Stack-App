import { z } from "zod";
import i18n from "../i18n";

const UserRole = z.enum(["patient", "doctor"]);

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, i18n.t('validation:required'))
      .min(3, i18n.t('validation:minLength', { count: 3 })),
    lastName: z
      .string()
      .min(1, i18n.t('validation:required'))
      .min(3, i18n.t('validation:minLength', { count: 3 })),
    email: z
      .string()
      .min(1, i18n.t('validation:required'))
      .email(i18n.t('validation:invalidEmail')),
    phone: z
      .string()
      .min(1, i18n.t('validation:required'))
      .regex(/^[0-9+]+$/, i18n.t('validation:invalidPhone'))
      .min(10, i18n.t('validation:minLength', { count: 10 }))
      .max(15, i18n.t('validation:minLength', { count: 15 })),
    password: z
      .string()
      .min(1, i18n.t('validation:required'))
      .min(6, i18n.t('validation:minLength', { count: 6 })),
    confirmPassword: z.string().min(1, i18n.t('validation:required')),
    role: UserRole,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('validation:passwordMismatch'),
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;