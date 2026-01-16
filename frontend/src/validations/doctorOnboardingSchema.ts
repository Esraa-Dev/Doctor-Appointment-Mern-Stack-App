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

export const doctorOnboardingSchema = z.object({
  department: z.string().min(1, i18n.t("validation:required")),
  specialization_en: z.string().min(1, i18n.t("validation:required")),
  specialization_ar: z.string().min(1, i18n.t("validation:required")),
  qualification_en: z.string().min(1, i18n.t("validation:required")),
  qualification_ar: z.string().min(1, i18n.t("validation:required")),
  experience: z
    .number()
    .min(0, i18n.t("validation:experienceMin"))
    .max(50, i18n.t("validation:experienceMax"))
    .int(i18n.t("validation:experienceInteger")),
  fee: z.number().min(100, i18n.t("validation:feeMin")),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  schedule: z.array(scheduleSchema).min(1, i18n.t("validation:atLeastOneDay")),
});

export type DoctorOnboardingData = z.infer<typeof doctorOnboardingSchema>;