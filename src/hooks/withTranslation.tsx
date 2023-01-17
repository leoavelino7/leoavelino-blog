import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

import { useTranslation as useTranslationI18Next } from "react-i18next";

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
  { children: "en", value: Language.EN },
  { children: "pt-BR", value: Language.PT_BR }
];

export const fallbackLng = Language.EN;

export const isSupported = (language: Language) => supportedLngs.includes(language);

type ContextData = {
  scope: string;
};

const TranslationContext = createContext<ContextData>(null);

export const withTranslation = <P extends object>(Component: React.ComponentType<P>, scope: string) =>
  class WithTransition extends React.Component<P> {
    render() {
      const props = this.props;

      return (
        <TranslationContext.Provider value={{ scope }}>
          <Component {...(props as P)} scope={scope} />
        </TranslationContext.Provider>
      );
    }
  };

const getPathnameWithoutLanguage = (pathname: string) => pathname.split("/").slice(2).join("/");

export const useTranslation = (scope?: string) => {
  const router = useRouter();
  const ctx = useContext(TranslationContext);
  const _scope = scope ?? ctx.scope;

  const { t, ready, i18n } = useTranslationI18Next(_scope);

  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState(() => i18n.language);

  const changeLanguage = ({ value }: LanguageItem) => {
    if (isSupported(value) && value !== locale) {
      const pathnameWithoutLanguage = getPathnameWithoutLanguage(location.pathname);

      setLocale(value);
      i18n.changeLanguage(value);

      const pathname = `/${value}/${pathnameWithoutLanguage}`;

      router.push(
        {
          pathname,
          search: location.search
        },
        undefined,
        {
          locale: false,
          shallow: false
        }
      );
    }
  };

  useEffect(() => {
    setLoading(!ready);
  }, [ready]);

  useEffect(() => {
    if (i18n.resolvedLanguage !== locale) {
      setLocale(i18n.resolvedLanguage);
    }
  }, [i18n.resolvedLanguage, locale]);

  return {
    t,
    loading,
    locale,
    changeLanguage,
    languages,
    isSupported
  };
};
