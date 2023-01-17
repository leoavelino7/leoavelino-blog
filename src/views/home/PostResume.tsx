import { FC } from "react";

import { AppLinks } from "../../lib/appLinks";
import { Chip } from "../../components";
import { ArrowDownIcon } from "../../icons";
import Link from "next/link";
import { Posts } from "src/clients/database/posts";
import { CategoriesLib } from "src/lib/categories";
import { useTranslation } from "src/hooks";

type PostResumeProps = {
  post: Posts.Post;
};

export const PostResume: FC<PostResumeProps> = ({ post }) => {
  const { t, locale } = useTranslation();

  return (
    <article className="flex flex-col rounded-md pb-2">
      <img src={post.thumbnailLarge} alt="" />
      <div className="px-1">
        <Chip
          className={`${
            CategoriesLib.categoriesColor[post.category.slug as CategoriesLib.Categories]
          } flex flex-row items-center w-fit gap-x-1 mt-6 mb-4 uppercase`}
        >
          <img src={post.category.image} alt="" className="w-5 h-5" />
          {post.category.label}
        </Chip>
        <span className="flex flex-row gap-x-2 items-center text-neutral-extra-light font-medium font-poppins">
          Leonardo Avelino
          <span aria-hidden="true" className="rounded-full w-2 h-2 bg-neutral-extra-light" />
          {locale &&
            new Date(post.createdAt).toLocaleDateString(locale.toLowerCase(), {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
        </span>
        <h3 className="mt-2 mb-4 text-neutral-dark text-2xl font-poppins font-bold">{post.title}</h3>
        <p className="text-neutral text-md lg:text-lg font-poppins">{post.description}</p>
        <Link
          href={AppLinks.post(locale, post.slug)}
          className="flex flex-row gap-x-2 justify-start items-start mt-4 text-primary font-semibold font-poppins w-fit border border-solid border-transparent focus:outline-dashed"
          locale={false}
        >
          {t("read_post")}
          <ArrowDownIcon className="-rotate-90 w-4" />
        </Link>
      </div>
    </article>
  );
};
