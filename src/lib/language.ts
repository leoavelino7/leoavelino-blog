export enum Language {
  PT_BR = "pt-BR",
  EN = "en"
}

export type LanguageItem = {
  children: string;
  value: Language;
};

export const supportedLngs = [Language.PT_BR, Language.EN];

export const languages: LanguageItem[] = [
  { children: "English", value: Language.EN },
  { children: "Português (Brasil)", value: Language.PT_BR }
];

export const fallbackLng = Language.EN;

export const isSupported = (language: Language) => supportedLngs.includes(language);

export const localePath = "/locales/{{lng}}/{{ns}}.json";
