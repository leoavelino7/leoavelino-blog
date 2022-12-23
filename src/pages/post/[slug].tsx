import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Posts } from "src/clients/database";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post as PostPage } from "../../views/post";

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Posts.FromEnv().getPathsAll("post");

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale,
}) => {
  const { slug } = params;

  const commonProps = {
    ...(await serverSideTranslations(locale ?? defaultLocale, [
      "common",
      "home",
    ])),
  };

  // TODO - Add Zod here
  if (!slug || typeof slug !== "string") {
    return {
      props: {
        post: {},
        ...commonProps,
      },
    };
  }

  const post = Posts.FromEnv().getBySlug(slug);

  return {
    props: {
      post,
      slug,
      categories: [],
      ...commonProps,
    },
  };
};
export default PostPage;
