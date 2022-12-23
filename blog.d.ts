import { TFunction } from "react-i18next";

export {};

declare global {
  type ComponentI18n = Partial<{
    locale: string;
    translate: TFunction;
    loading: boolean;
  }>;

  namespace NodeJS {
    interface ProcessEnv {
      GA_TRACKING_ID: string;
    }
  }
}
