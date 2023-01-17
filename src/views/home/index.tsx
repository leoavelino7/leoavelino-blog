import { Fragment } from "react";
import { Categories } from "src/clients/database/categories";
import { Posts } from "src/clients/database/posts";
import { withTranslation } from "src/hooks";
import { CategoriesLib } from "src/lib/categories";

import { Header, Footer } from "../../components";
import { BannerMain } from "./BannerMain";
import { Feedbacks } from "./Feedbacks";
import { Libs } from "./Libs";
import { PostList } from "./PostList";

type HomeProps = {
  categories: Categories.Category[];
  posts: Posts.Post[];
};

const scope = "home";

export const Home = withTranslation((data: HomeProps) => {
  return (
    <Fragment>
      <Header />
      <main>
        <BannerMain />
        <PostList
          posts={data.posts}
          categories={data.categories}
          selectedCategory={CategoriesLib.Categories.All}
          setSelectedCategory={(category) => {}}
        />
        <Libs />
        <Feedbacks />
        <Footer categories={data.categories} />
      </main>
    </Fragment>
  );
}, scope);
