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
    message: i18n.t("validation.dayRequired"),
  }),
  startTime: z.string().min(1, i18n.t("validation.startTimeRequired")),
  endTime: z.string().min(1, i18n.t("validation.endTimeRequired")),
});

export const doctorOnboardingSchema = z.object({
  department: z.string().min(1, i18n.t("errors.required")),
  specialization: z.string().min(1, i18n.t("errors.required")),
  qualification: z.string().min(1, i18n.t("errors.required")),
  experience: z
    .number()
    .min(0, i18n.t("validation.experienceMin"))
    .max(50, i18n.t("validation.experienceMax"))
    .int(i18n.t("validation.experienceInteger")),
  fee: z.number().min(100, i18n.t("validation.feeMin")),
  description: z.string().optional(),
  schedule: z.array(scheduleSchema).min(1, i18n.t("validation.atLeastOneDay")),
});
