import { TFunction } from "react-i18next";

export {};

declare global {
  type ComponentI18n<T = {}> = T & {
    scope?: string;
  };
}
