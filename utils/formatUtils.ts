export default function formatDateToLongEnglish(input: string): string {
  const date = typeof input === "string" ? new Date(input) : input;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
