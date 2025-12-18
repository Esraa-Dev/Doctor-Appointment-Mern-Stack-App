export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "غير محدد";

  try {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "غير محدد";
  }
};
