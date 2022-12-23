import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Categories } from "src/clients/database/categories";
import { Posts } from "src/clients/database/posts";
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

export const Home = (data: HomeProps) => {
  const { t, i18n, ready } = useTranslation("home");

  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState(() => i18n.resolvedLanguage);

  useEffect(() => {
    setLoading(!ready);
  }, [ready]);

  useEffect(() => {
    if (i18n.resolvedLanguage !== locale) {
      setLocale(i18n.resolvedLanguage);
    }
  }, [i18n.resolvedLanguage]);

  // const [searchParams, setSearchParams] = useSearchParams({
  //   category: Categories.All
  // });

  return (
    <Fragment>
      <Header loading={loading} locale={locale} />
      <main>
        <BannerMain locale={locale} translate={t} loading={loading} />
        <PostList
          locale={locale}
          translate={t}
          loading={loading}
          posts={data.posts}
          categories={data.categories}
          selectedCategory={CategoriesLib.Categories.All}
          setSelectedCategory={(category) => {}}
        />
        <Libs locale={locale} translate={t} loading={loading} />
        <Feedbacks translate={t} loading={loading} />
        <Footer categories={data.categories} loading={loading} />
      </main>
    </Fragment>
  );
};
