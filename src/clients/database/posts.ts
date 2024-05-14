import type { Nullable } from "../../lib/types";
import { Implementations } from "./types";

import { Categories } from "./categories";
import { LocalPosts } from "./Impl/local/posts";

const implementations: Record<Implementations, (locale: string) => Posts.Constructor> = {
  local: LocalPosts
};

export namespace Posts {
  export type OpenGraph = {
    "og:image": string;
    "twitter:image": string;
  };

  export type Post = {
    id: string;
    locale: string;
    title: string;
    keywords: Array<string>;
    description: string;
    category: Categories.Category;
    thumbnailLarge: string;
    openGraph: Nullable<OpenGraph>;
    slug: string;
    createdAt: string;
    _code: string;
  };

  export type Options = Partial<{
    propsToShow: Record<keyof Post, true>;
    sortBy: "ASC" | "DESC";
    sortProperty: keyof Post;
  }>;

  export type Constructor = {
    getAll: (options?: Options) => Array<Post>;
    getBySlug: (slug: string) => Nullable<Post>;
    getPathsAll: (prefix: string) => Array<string>;
  };

  export const FromEnv = implementations[Implementations.Local];
}
