import { useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type ThemeName = "theme-light" | "theme-dark" | "theme-heroes";

export type Theme = { children: JSX.Element | string; value: ThemeName };

export const themes: Theme[] = [
  {
    children: "Light",
    value: "theme-light"
  },
  {
    children: "Dark",
    value: "theme-dark"
  },
  {
    children: "Heroes",
    value: "theme-heroes"
  }
];

const themesValue: ThemeName[] = themes.map((theme) => theme.value);

const isSupportedTheme = (theme: string) => themesValue.includes(theme as ThemeName);

export const useTheme = (): [string, (theme: string) => void] => {
  const [theme, setTheme] = useLocalStorage("@theme", "theme-light");
  const lastThemeRef = useRef(theme);

  const changeTheme = (selectedTheme: string) => {
    if (isSupportedTheme(selectedTheme) && selectedTheme !== theme) {
      setTheme(selectedTheme);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { classList } = window.document.documentElement;
      classList.remove(lastThemeRef.current);
      classList.add(theme);
      lastThemeRef.current = theme;
    }
  }, [theme]);

  return [theme, changeTheme];
};
