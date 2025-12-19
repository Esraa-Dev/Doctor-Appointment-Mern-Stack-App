import { z } from "zod";

export const profileImageSchema = z.object({
  image: z
    .instanceof(File, { message: "Profile image is required" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image must be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "Only JPG or PNG images are allowed",
      }
    ),
});

export type ProfileImageFormData = z.infer<typeof profileImageSchema>;
