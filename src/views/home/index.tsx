import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Categories } from "src/clients/database/categories";
import { Posts } from "src/clients/database/posts";
import { withTranslation } from "src/hooks";
import { CategoriesLib } from "src/lib/categories";
import { Nullable } from "src/lib/types";

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
  const router = useRouter();

  const [posts, setPosts] = useState(data.posts);
  const [selectedCategory, setSelectedCategory] = useState<Nullable<CategoriesLib.Categories>>(null);

  const applyFilter = (category: CategoriesLib.Categories) => {
    if (category === CategoriesLib.Categories.All) {
      return void setPosts(data.posts);
    }

    const postsFiltered = data.posts.filter((post) => post.category.slug === category);
    setPosts(postsFiltered);
  };

  const updateQs = (category: CategoriesLib.Categories) => {
    router.push(
      {
        query: {
          category
        }
      },
      undefined,
      {
        shallow: true
      }
    );
  };

  const changeSelectedCategory = (category: CategoriesLib.Categories) => {
    updateQs(category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    applyFilter(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (router.isReady) {
      const category = CategoriesLib.getCategory(String(router.query.category));
      setSelectedCategory(category);
    }
  }, [router.isReady, router.query.category]);

  return (
    <Fragment>
      <Header />
      <main>
        <BannerMain />
        <PostList posts={posts} categories={data.categories} selectedCategory={selectedCategory} onChangeSelectedCategory={changeSelectedCategory} />
        <Libs />
        <Feedbacks />
        <Footer categories={data.categories} />
      </main>
    </Fragment>
  );
}, scope);
