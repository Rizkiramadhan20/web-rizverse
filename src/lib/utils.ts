import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedText(
  text: { id: string; en: string } | string,
  locale: "id" | "en"
): string {
  if (typeof text === "string") {
    return text;
  }
  return text[locale] || text.id || text.en || "";
}

export function getLocalizedButtonText(
  button: { label: { id: string; en: string }; href: string },
  locale: "id" | "en"
): { label: string; href: string } {
  return {
    label: getLocalizedText(button.label, locale),
    href: button.href,
  };
}
