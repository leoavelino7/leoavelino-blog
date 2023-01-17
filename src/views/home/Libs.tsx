import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "src/hooks";

import { ButtonLink, Chip } from "../../components";
import { GitHubIcon } from "../../icons";
import { AppLinks } from "../../lib/appLinks";

const libs = [
  {
    name: "Mocker API Faster",
    description: "section_libs_mocker_api_faster_description",
    githubLink: "https://github.com/leoavelino7/mocker-api-faster"
  },
  {
    name: "Shortcut Keys",
    description: "section_libs_shortcut_keys_description",
    githubLink: "https://github.com/leoavelino7/shortcut-keys"
  }
];

export const Libs: FC = () => {
  const { t, loading } = useTranslation();

  return (
    <section className="w-full py-28 bg-paper-light">
      <header className="w-full px-4 lg:px-1 m-auto max-w-7xl">
        <Chip className="text-primary bg-primary-light">{loading ? <Skeleton width="120px" height="10px" /> : t("section_libs_chip")}</Chip>
        <h2 className="font-bold font-poppins text-3xl lg:text-4xl mt-8">
          {loading ? <Skeleton className="w-full max-w-[200px]" /> : t("section_libs_title")}
        </h2>
        <h3 className="font-poppins max-w-[741px] text-neutral text-lg lg:text-xl mt-4">
          {loading ? <Skeleton className="w-full" count={3} /> : t("section_libs_description")}
        </h3>
      </header>
      <section className="px-4 lg:px-0 my-12 m-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {libs.map((lib) => (
            <section key={lib.name} className="bg-paper flex flex-col gap-3 rounded-lg border border-solid border-neutral-light py-11 px-10">
              <div className="flex flex-row justify-between">
                <h3 className="font-semibold text-neutral-dark text-xl">{lib.name}</h3>
                <a
                  href={lib.githubLink}
                  target="_blank"
                  className="hidden lg:flex flex-row gap-1 text-primary font-medium focus:outline-dashed"
                  rel="noreferrer"
                >
                  {loading ? <Skeleton width="100px" /> : t("section_libs_button")}
                  <span className="sr-only"> - {lib.name}</span> <GitHubIcon />
                </a>
              </div>
              <p className="text-neutral">{loading ? <Skeleton width="100%" /> : t(lib.description)}</p>
              <a
                href={lib.githubLink}
                target="_blank"
                className="flex flex-row lg:hidden gap-1 text-primary font-medium focus:outline-dashed"
                rel="noreferrer"
              >
                {loading ? <Skeleton width="100px" /> : t("section_libs_button")}
                <span className="sr-only"> - {lib.name}</span> <GitHubIcon />
              </a>
            </section>
          ))}
        </div>
        <div className="w-fit m-auto mt-12 lg:mt-24">
          <ButtonLink external to={AppLinks.github} outline>
            {loading ? <Skeleton width="120px" /> : t("section_libs_github_button")}
            <GitHubIcon className="ml-1" />
          </ButtonLink>
        </div>
      </section>
    </section>
  );
};
