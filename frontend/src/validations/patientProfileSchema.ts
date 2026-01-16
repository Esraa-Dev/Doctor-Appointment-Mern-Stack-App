import { z } from "zod";
import i18n from "../i18n";

export const patientProfileSchema = z.object({
  firstName: z.string().min(3, i18n.t("validation:firstNameRequired")),
  lastName: z.string().min(3, i18n.t("validation:lastNameRequired")),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, i18n.t("validation:invalidPhone")),
  dateOfBirth: z.string().nullable().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"])
    .optional(),
  address: z.object({
    address1_en: z.string().optional(),
    address1_ar: z.string().optional(),
    address2_en: z.string().optional(),
    address2_ar: z.string().optional(),
    city_en: z.string().optional(),
    city_ar: z.string().optional(),
    state_en: z.string().optional(),
    state_ar: z.string().optional(),
    country_en: z.string().optional(),
    country_ar: z.string().optional(),
    pincode: z.string().optional(),
  }),
  emergencyContact: z
    .object({
      name: z.string().optional(),
      relationship: z
        .enum(["spouse", "parent", "child", "sibling", "friend", "other"])
        .optional(),
      phone: z.string().optional(),
    })
    .optional(),
  medicalHistory_en: z.string().optional(),
  medicalHistory_ar: z.string().optional(),
  allergies: z.union([z.string(), z.array(z.string())]).optional(),
});

export type PatientProfileFormData = z.infer<typeof patientProfileSchema>;