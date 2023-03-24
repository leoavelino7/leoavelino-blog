import { Home } from "../views/home";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Posts, Categories } from "../clients/database";

export async function getStaticProps({ locale }) {
  const posts = Posts.FromEnv(locale);
  const categories = Categories.FromEnv();

  const allPosts = posts.getAll();
  
  const categoriesId = Array.from(new Set(allPosts.map((post) => post.category.id)));

  return {
    props: {
      posts: allPosts,
      categories: categories.getAll().filter(category => categoriesId.includes(category.id)),
      ...(await serverSideTranslations(locale ?? "en", ["common", "home"])),
    },
  };
}

export default Home;
