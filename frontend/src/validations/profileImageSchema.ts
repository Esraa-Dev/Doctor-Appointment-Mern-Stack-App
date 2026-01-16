import { z } from "zod";
import i18n from "../i18n";

export const profileImageSchema = z.object({
  image: z
    .instanceof(File, { message: i18n.t("validation:required") })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: i18n.t("validation:fileTooLarge"),
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: i18n.t("validation:invalidFileType"),
      }
    ),
});

export type ProfileImageFormData = z.infer<typeof profileImageSchema>;