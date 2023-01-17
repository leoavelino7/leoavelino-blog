import { Posts } from "../../posts";
import { allPosts as generatedAllPosts } from "contentlayer/generated";
import { Categories } from "../../categories";
import { Nullable } from "../../../../lib/types";

export const LocalPosts: (locale: string) => Posts.Constructor = (locale) => {
  let posts: Nullable<Array<Posts.Post>> = null;

  const categories = Categories.FromEnv();

  // TODO - Options
  const getAll = (options?: Posts.Options): Array<Posts.Post> => {
    const _posts: Array<Posts.Post> = generatedAllPosts
      .map((post) => ({
        id: post._id,
        title: post.title,
        keywords: post.keywords,
        locale: post.locale,
        category: categories.getBySlug(post.categorySlug),
        createdAt: post.createdAt,
        description: post.description,
        openGraph: {
          "og:image": "",
          "twitter:image": ""
        },
        slug: post.slug,
        thumbnailLarge: post.thumbnailLarge,
        _code: post.body.code
      }))
      .filter((post) => post.locale === locale);

    posts = _posts;

    return posts;
  };

  const getBySlug = (slug: string) => posts.find((post) => post.slug === slug);

  const getPathsAll = (prefix: string) => posts.map((post) => `/${post.locale}/${prefix}/${post.slug}`);

  getAll();

  return {
    getAll,
    getBySlug,
    getPathsAll,
  };
};
