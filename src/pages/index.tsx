import { Home } from "../views/home";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Posts, Categories } from "../clients/database";

export async function getStaticProps({ locale }) {
  const posts = Posts.FromEnv(locale);
  const categories = Categories.FromEnv();

  return {
    props: {
      posts: posts.getAll(),
      categories: categories.getAll(),
      ...(await serverSideTranslations(locale ?? "en", ["common", "home"])),
    },
  };
}

export default Home;
