import { FC } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { LeoAvelinoIcon, TranslateIcon } from "../icons";
import { AppLinks } from "../lib/appLinks";
import { Fragment } from "react";
import { Dropdown } from "./Dropdown";
// import { themes, useTheme } from "../hooks/useTheme";
// import type { Theme } from "../hooks/useTheme";
// import { useFontSize } from "../hooks/useFontSize";
// import type { FontSize } from "../hooks/useFontSize";
import { LanguageItem, languages, useTranslation } from "src/hooks";

export const Header: FC = () => {
  const { t, locale, loading, changeLanguage } = useTranslation("common");

  // const [theme, setTheme] = useTheme();
  // const [fontSize, setFontSize, fontSizeList] = useFontSize();

  return (
    <nav className="relative flex items-center w-full bg-paper h-28 md:h-20 header-shadow z-40">
      <div className="relative flex flex-col gap-y-4 md:flex-row justify-between items-center w-full px-4 lg:px-1 m-auto max-w-7xl">
        <header>
          {loading ? (
            <Skeleton width="196px" height="32px" />
          ) : (
            <Link href={AppLinks.home(locale)} className="flex w-fit focus:outline-none focus:opacity-60" locale={false}>
              <LeoAvelinoIcon />
            </Link>
          )}
        </header>
        <div className="flex flex-row gap-4">
          <Dropdown<LanguageItem>
            id="language-dropdown"
            label={
              <Fragment>
                <TranslateIcon />
                {loading ? <Skeleton width="60px" /> : <span className="sr-only">{t("header_languages")}</span>}
              </Fragment>
            }
            list={languages}
            change={changeLanguage}
            itemActive={locale}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          {
            // TODO - Disabled
            // <Dropdown<Theme>
            //   id="theme-dropdown"
            //   label={
            //     <Fragment>
            //       {loading ? <Skeleton width="60px" /> : <span className="sr-only">{t("header_themes")}</span>}
            //     </Fragment>}
            //   list={themes}
            //   change={(theme) => setTheme(theme.value)}
            //   itemActive={theme}
            //   itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
            // />
            
            // <Dropdown<FontSize>
            //   id="font-size-dropdown"
            //   label={loading ? <Skeleton width="60px" /> : t("header_font_size")}
            //   list={fontSizeList}
            //   change={(fontSize) => setFontSize(fontSize.value)}
            //   itemActive={fontSize}
            //   itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
            // />
          }
        </div>
      </div>
    </nav>
  );
};
