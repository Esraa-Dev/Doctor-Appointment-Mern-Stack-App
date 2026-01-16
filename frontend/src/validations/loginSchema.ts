import { useTranslation } from "react-i18next";
import { z } from "zod";

export const loginSchema = () => {
  const { t } = useTranslation(["validation"]);

  return z.object({
    email: z.string().min(1, t("required")).email(t("invalidEmail")),
    password: z.string().min(1, t("required")),
  });
};

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;