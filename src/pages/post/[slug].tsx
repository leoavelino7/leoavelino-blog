import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Posts } from "src/clients/database";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post as PostPage } from "../../views/post";

export const getStaticPaths: GetStaticPaths = ({ locales }) => {
  const paths = locales.map((locale) => Posts.FromEnv(locale).getPathsAll("post")).flat();

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale, defaultLocale }) => {
  const { slug } = params;

  const _locale = locale ?? defaultLocale;

  const commonProps = {
    ...(await serverSideTranslations(_locale, ["common", "home"]))
  };

  const commonReturnToNotFound = {
    redirect: "/404",
    props: {
      post: {},
      ...commonProps
    }
  };

  if (!slug || typeof slug !== "string") {
    return commonReturnToNotFound;
  }

  const post = Posts.FromEnv(_locale).getBySlug(slug);

  if (!post) return commonReturnToNotFound;

  return {
    props: {
      post,
      slug,
      categories: [],
      ...commonProps
    }
  };
};
export default PostPage;
