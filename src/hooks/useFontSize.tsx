import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSsr } from "./useSsr";
import { useLocalStorage } from "./useLocalStorage";

export type FontSizeClassName = "text-xs" | "text-sm" | "text-md" | "text-lg" | "text-xl";

export type FontSize = { children: JSX.Element | string; value: FontSizeClassName };

export const useFontSize = (): [string, (fontSize: string) => void, FontSize[]] => {
  const { t } = useTranslation("common");
  const [fontSize, setFontSize] = useLocalStorage("@fontSize", "text-md");
  const lastFontSizeRef = useRef(fontSize);
  const { isBrowser } = useSsr();

  const fontSizeList: FontSize[] = [
    {
      children: t("header_font_size_extra_small"),
      value: "text-xs"
    },
    {
      children: t("header_font_size_small"),
      value: "text-sm"
    },
    {
      children: t("header_font_size_default"),
      value: "text-md"
    },
    {
      children: t("header_font_size_large"),
      value: "text-lg"
    },
    {
      children: t("header_font_size_extra_large"),
      value: "text-xl"
    }
  ];

  const fontSizeValue: FontSizeClassName[] = fontSizeList.map((theme) => theme.value);

  const isSupportedFontSize = (fontSize: string) => fontSizeValue.includes(fontSize as FontSizeClassName);

  const changeFontSize = (selectedFontSize: string) => {
    if (isSupportedFontSize(selectedFontSize) && selectedFontSize !== fontSize) {
      setFontSize(selectedFontSize);
    }
  };

  useEffect(() => {
    if (isBrowser) {
      const { classList } = window.document.documentElement;
      classList.remove(lastFontSizeRef.current);
      classList.add(fontSize);
      lastFontSizeRef.current = fontSize;
    }
  }, [fontSize]);

  return [fontSize, changeFontSize, fontSizeList];
};
