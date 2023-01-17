import { FC, Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import { AppLinks } from "../../lib/appLinks";
import { ButtonLink, Chip } from "../../components";
import { ArrowDownIcon } from "../../icons";
import { DetailIllustration, NotebookIllustration } from "../../illustrations";
import { useTranslation } from "src/hooks";

export const BannerMain: FC = () => {
  const { t, locale, loading } = useTranslation();

  return (
    <section className="relative py-11 bg-paper-light">
      <div className="top-0 w-full h-full absolute z-10 banner-main-hack" />
      <div className="flex flex-col justify-center items-center absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-full h-full z-0">
        <DetailIllustration className="opacity-60 md:opacity-40" />
      </div>
      <div className="relative z-10 px-4 lg:px-1 m-auto max-w-full lg:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
          <div className="col-span-1 flex flex-col justify-center items-start gap-3">
            <Chip>{loading ? <Skeleton width="100px" height="10px" /> : t("main_banner_chip")}</Chip>

            <h1 className="w-full font-bold text-4xl lg:text-6xl font-poppins">
              {loading ? (
                <Fragment>
                  <Skeleton className="my-1" width="50%" height="55px" />
                  <Skeleton className="my-1" width="40%" height="55px" />
                  <Skeleton className="my-1" width="70%" height="55px" />
                </Fragment>
              ) : (
                <Fragment>
                  {t("main_banner_title_study")}
                  {t("main_banner_title_create")}
                  <br />
                  {t("main_banner_title_learn")}
                  <br />
                  {t("main_banner_title_share")}
                </Fragment>
              )}
            </h1>

            <div className="flex w-full max-w-[513px] mt-1 mb-4">
              <p className="w-full text-neutral text-md md:text-lg leading-snug font-poppins font-medium">
                {loading ? <Skeleton width="100%" count={5} /> : t("main_banner_description")}
              </p>
            </div>

            <ButtonLink to={loading ? "" : AppLinks.homeCategories(locale, t("section_category_id"))}>
              {loading ? <Skeleton width="120px" /> : t("main_banner_button")}
              <ArrowDownIcon className="ml-1" />
            </ButtonLink>
          </div>
          <div className="col-span-1">
            <NotebookIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
