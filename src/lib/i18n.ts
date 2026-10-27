export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function getDictionary(locale: Locale) {
  const dictionaries = {
    it: () => import("@/dictionaries/it.json").then((m) => m.default),
    en: () => import("@/dictionaries/en.json").then((m) => m.default),
  } as const;
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
