import { en } from "./en";
import type { Content, Locale } from "./types";
import { vi } from "./vi";

export const locales: Locale[] = ["en", "vi"];

const contentByLocale: Record<Locale, Content> = { en, vi };

export const getContent = (locale: Locale) => contentByLocale[locale];

export const localePath = (locale: Locale, path: string) => (locale === "en" ? path : `/vi${path}`);
