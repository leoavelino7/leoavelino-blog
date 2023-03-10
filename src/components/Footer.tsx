import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import { GitHubIcon, LeoAvelinoAlternativeIcon, TwitterIcon } from "../icons";
import { AppLinks } from "../lib/appLinks";
import { Divider } from "./Divider";
import Link from "next/link";
import { CategoriesLib } from "src/lib/categories";
import { Categories } from "src/clients/database";
import { useTranslation } from "src/hooks";

const medias = [
  {
    title: "Twitter Léo Avelino",
    Icon: <TwitterIcon className="text-primary-dark" />,
    link: "https://twitter.com/leoavelino16"
  },
  {
    title: "Github Léo Avelino",
    Icon: <GitHubIcon className="text-primary-dark" />,
    link: "https://github.com/leoavelino7"
  }
];

export type FooterProps = {
  categories: Array<Categories.Category>;
};

export const Footer: FC<FooterProps> = ({ categories }) => {
  const { t, locale, loading } = useTranslation("common");

  return (
    <footer className="bg-primary-dark py-10 px-4">
      <div className="flex flex-col gap-8 m-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div>
            <LeoAvelinoAlternativeIcon />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <h3 className="font-poppins font-bold text-xl text-paper">{loading ? <Skeleton width="120px" /> : t("footer_categories")}</h3>
            {loading ? (
              <Skeleton width="300px" height="20px" />
            ) : (
              <ul className="grid grid-cols-2 md:flex gap-3 md:gap-x-7">
                {categories.map((category) => (
                  <li key={category.slug} className="w-fit">
                    <Link
                      href={AppLinks.homeCategory(locale, category.slug)}
                      className="flex flex-row gap-x-2 items-center focus:outline-none focus:underline focus:brightness-75 font-poppins font-semibold text-paper hover:brightness-75"
                      locale={false}
                    >
                      <span className={`${CategoriesLib.categoriesColor[category.slug as CategoriesLib.Categories]} p-1 rounded-md`}>
                        <img src={category.image} className="w-4 h-4" alt="" />
                      </span>
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Divider />

        <div className="flex flex-row gap-4 items-center justify-between">
          <p className="font-poppins text-paper text-sm md:text-base">{loading ? <Skeleton width="120px" /> : t("footer_description")}</p>
          <ul className="flex flex-row gap-4">
            {medias.map((media) => (
              <li key={media.link} className="flex items-center justify-center w-7 h-7 bg-paper hover:brightness-75 rounded-full">
                <a href={media.link} target="_blank" className="focus:outline-none focus:opacity-75" rel="noreferrer">
                  <span className="sr-only">{media.title}</span>
                  {media.Icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
