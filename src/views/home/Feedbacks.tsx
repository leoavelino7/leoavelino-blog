import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "src/hooks";

import { ButtonLink } from "../../components";
import { FeedbackIllustration } from "../../illustrations";
import { AppLinks } from "../../lib/appLinks";

export const Feedbacks: FC = () => {
  const { t, loading } = useTranslation();

  return (
    <div className="w-full pt-20 pb-28 bg-paper">
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center mx-4 lg:mx-auto my-12 m-auto max-w-7xl border-2 border-solid border-neutral-light rounded-lg">
        <div className="col-span-1 px-4 py-11 lg:px-16">
          <h4 className="text-3xl lg:text-4xl font-bold leading-snug">{loading ? <Skeleton width="80%" /> : t("section_feedback_title")}</h4>
          <ul className="flex flex-col gap-5 my-8 text-lg lg:text-xl font-medium">
            <ol className="font-poppins">
              <span className="font-bold text-primary mr-1">1.</span>
              {loading ? <Skeleton width="80%" /> : t("section_feedback_step_1")}
            </ol>
            <ol className="font-poppins">
              <span className="font-bold text-primary mr-1">2.</span>
              {loading ? <Skeleton width="80%" /> : t("section_feedback_step_2")}
            </ol>
            <ol className="font-poppins">
              <span className="font-bold text-primary mr-1">3.</span>
              {loading ? <Skeleton width="80%" /> : t("section_feedback_step_3")}
            </ol>
            <ol className="font-poppins">
              <span className="font-bold text-primary mr-1">4.</span>
              {loading ? <Skeleton width="80%" /> : t("section_feedback_step_4")}
            </ol>
          </ul>
          <div className="w-fit">
            <ButtonLink to={AppLinks.githubBlog} small outline external>
              {loading ? <Skeleton width="120px" /> : t("section_feedback_step_button")}
            </ButtonLink>
          </div>
        </div>
        <div className="col-span-1 md:flex md:items-center bg-neutral-light bg-opacity-20 px-7 lg:px-14">
          <FeedbackIllustration />
        </div>
      </section>
    </div>
  );
};
