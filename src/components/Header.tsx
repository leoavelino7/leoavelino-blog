import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import { LeoAvelinoIcon, TranslateIcon } from "../icons";
import { AppLinks } from "../lib/appLinks";
import { isSupported, languages } from "../lib/language";
import type { LanguageItem } from "../lib/language";
import { Fragment, useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { themes, useTheme } from "../hooks/useTheme";
import type { Theme } from "../hooks/useTheme";
import { useFontSize } from "../hooks/useFontSize";
import type { FontSize } from "../hooks/useFontSize";

const getPathnameWithoutLanguage = (pathname: string) =>
  pathname.split("/").slice(2).join("/");

type HeaderProps = {
  locale: string;
  loading: boolean;
};

export const Header: FC<HeaderProps> = ({ loading, locale }) => {
  const { t, i18n } = useTranslation();

  const router = useRouter();

  const [theme, setTheme] = useTheme();
  const [fontSize, setFontSize, fontSizeList] = useFontSize();
  const [language, setLanguage] = useState(() => i18n.resolvedLanguage);

  const changeLanguage = ({ value: locale }: LanguageItem) => {
    if (isSupported(locale) && locale !== i18n.resolvedLanguage) {
      const pathnameWithoutLanguage = getPathnameWithoutLanguage(
        location.pathname
      );

      setLanguage(locale);
      i18n.changeLanguage(locale);

      router.push(
        {
          pathname: `${locale}/${pathnameWithoutLanguage}`,
          // hash: location.hash, // TODO Remove ?
          search: location.search,
        },
        undefined,
        {
          locale,
          shallow: true,
        }
      );
    }
  };

  return (
    <nav className="relative flex items-center w-full bg-paper h-28 md:h-20 header-shadow z-40">
      <div className="relative flex flex-col gap-y-4 md:flex-row justify-between items-center w-full px-4 lg:px-1 m-auto max-w-7xl">
        <header>
          <Link
            href={AppLinks.home()}
            locale={locale}
            className="flex w-fit focus:outline-none focus:opacity-60"
          >
            <LeoAvelinoIcon />
          </Link>
        </header>
        <div className="flex flex-row gap-4">
          <Dropdown<LanguageItem>
            id="language-dropdown"
            label={
              <Fragment>
                <TranslateIcon />
                {loading ? <Skeleton width="60px" /> : t("header_languages")}
              </Fragment>
            }
            list={languages}
            change={changeLanguage}
            itemActive={language ?? i18n.resolvedLanguage}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          <Dropdown<Theme>
            id="theme-dropdown"
            label={loading ? <Skeleton width="60px" /> : t("header_themes")}
            list={themes}
            change={(theme) => setTheme(theme.value)}
            itemActive={theme}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          <Dropdown<FontSize>
            id="font-size-dropdown"
            label={loading ? <Skeleton width="60px" /> : t("header_font_size")}
            list={fontSizeList}
            change={(fontSize) => setFontSize(fontSize.value)}
            itemActive={fontSize}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />
        </div>
      </div>
    </nav>
  );
};
