import { z } from "zod";
import i18n from "../i18n";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const scheduleSchema = z.object({
  day: z.enum(days).refine((val) => days.includes(val), {
    message: i18n.t("validation:dayRequired"),
  }),
  startTime: z.string().min(1, i18n.t("validation:startTimeRequired")),
  endTime: z.string().min(1, i18n.t("validation:endTimeRequired")),
});

// Step 1: Professional Information (Specialization & Qualifications)
export const step1Schema = z.object({
  specialization_en: z.string().min(1, i18n.t("validation:required")),
  specialization_ar: z.string().min(1, i18n.t("validation:required")),
  qualification_en: z.string().min(1, i18n.t("validation:required")),
  qualification_ar: z.string().min(1, i18n.t("validation:required")),
});

// Step 2: Department & Experience
export const step2Schema = z.object({
  department: z.string().min(1, i18n.t("validation:required")),
  experience: z
    .number()
    .min(0, i18n.t("validation:experienceMin"))
    .max(50, i18n.t("validation:experienceMax"))
    .int(i18n.t("validation:experienceInteger")),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
});

// Step 3: Fees & Schedule
export const step3Schema = z.object({
  fee: z.number().min(100, i18n.t("validation:feeMin")),
  schedule: z.array(scheduleSchema)
    .min(1, i18n.t("validation:atLeastOneDay"))
    .refine(
      (schedules) => {
        const days = schedules.map(s => s.day);
        return new Set(days).size === days.length;
      },
      {
        message: i18n.t("validation:duplicateDays"),
      }
    ),
});
// Combined schema for final validation
export const doctorOnboardingSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);

export type DoctorOnboardingData = z.infer<typeof doctorOnboardingSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;