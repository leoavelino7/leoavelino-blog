import { Home } from "../views/home";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Posts, Categories } from "../clients/database";
import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: "Teste!!!"
  }
}

export async function getStaticProps({ locale }) {
  const posts = Posts.FromEnv(locale);
  const categories = Categories.FromEnv();

  const allPosts = posts.getAll();

  const categoriesId = Array.from(new Set(allPosts.map((post) => post.category.id)));

  const _locale = locale ?? "en";

  const serverSideT = {...(await serverSideTranslations(_locale, ["common", "home"]))};

  const title = serverSideT._nextI18Next.initialI18nStore[_locale].home.page_title;

  return {
    props: {
      posts: allPosts,
      categories: categories.getAll().filter((category) => categoriesId.includes(category.id)),
      ...serverSideT,
    }
  };
}

export default Home;
