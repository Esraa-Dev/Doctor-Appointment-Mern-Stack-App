import { z } from "zod";

export const patientProfileSchema = z.object({
  firstName: z.string().min(3, "الاسم الأول مطلوب"),
  lastName: z.string().min(3, "اسم العائلة مطلوب"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "رقم الهاتف غير صالح"),
  dateOfBirth: z.string().nullable().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]).optional(),
  address: z.object({
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
  }),
  emergencyContact: z.object({
    name: z.string().optional(),
    relationship: z.enum(["spouse", "parent", "child", "sibling", "friend", "other"]).optional(),
    phone: z.string().optional(),
  }).optional(),
  medicalHistory: z.string().optional(),
  allergies: z.union([z.string(), z.array(z.string())]).optional(),
});

export type PatientProfileFormData = z.infer<typeof patientProfileSchema>;