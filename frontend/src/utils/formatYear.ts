export function formatYear(year: string | Date): number | null {
  if (!year) return null;

  try {
    const date = new Date(year);
    const fullYear = date.getFullYear();
    return fullYear;
  } catch {
    return null;
  }
}
