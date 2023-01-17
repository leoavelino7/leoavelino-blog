import { Fragment, useEffect, useState } from "react";

import { Header, Footer, Chip, MdxComponents } from "../../components";
import { CopyAndShare } from "../../components/CopyAndShare";
import { Divider } from "../../components/Divider";
import { Posts } from "src/clients/database/posts";
import { Categories } from "src/clients/database/categories";
import { CategoriesLib } from "src/lib/categories";
import { useMDXComponent } from "next-contentlayer/hooks";
import { useTranslation, withTranslation } from "src/hooks";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";

type PostProps = {
  slug: string;
  post: Posts.Post;
  categories: Categories.Category[];
};

const scope = "post_content";

export const Post = withTranslation((data: PostProps) => {
  const { locale, loading } = useTranslation();
  const [shareData, setShareData] = useState<ShareData>({});
  const Component = useMDXComponent(data.post._code);

  useEffect(() => {
    setShareData({
      title: window.document.title,
      text: data.post.description,
      url: window.location.href
    });
  }, [data.post.description]);

  return (
    <Fragment>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content={data.post.description} />
        <meta name="keywords" content={data.post.keywords.join(",")} />
      </Head>

      <Header />
      <main className="bg-paper-light">
        <header className="flex flex-col justify-center items-center px-4 pt-24 pb-12">
          <p className="flex flex-row gap-x-2 items-center text-primary font-medium font-poppins">
            Leonardo Avelino
            <span aria-hidden="true" className="rounded-full w-2 h-2 bg-primary" />
            {loading || !locale ? (
              <Skeleton />
            ) : (
              new Date(data.post.createdAt).toLocaleDateString(locale.toLowerCase(), {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })
            )}
          </p>
          <h1 className="font-poppins text-neutral-dark font-bold text-4xl md:text-5xl mt-3 text-center">{data.post.title}</h1>
          <h2 className="font-poppins text-neutral font-medium text-lg md:text-xl text-center mt-4 mb-6 max-w-7xl">{data.post.description}</h2>
          <h3>
            <Chip
              className={`${
                CategoriesLib.categoriesColor[data.post.category.slug as CategoriesLib.Categories]
              } flex flex-row items-center w-fit gap-x-1 uppercase`}
            >
              <img src={data.post.category.image} className="w-5 h-5" alt="" />
              {data.post.category.label}
            </Chip>
          </h3>
        </header>
        <section>
          <header>
            <div className="mx-auto w-full max-w-6xl">
              <img src={data.post.thumbnailLarge} alt="" />
            </div>
            <div className="px-4 mx-auto w-full max-w-4xl">
              <Divider />
            </div>
          </header>
          <section className="px-4 mx-auto w-full max-w-4xl">{<Component components={MdxComponents} />}</section>
          <footer className="px-4 mx-auto w-full max-w-4xl">
            <div className="py-8">
              <Divider />
            </div>
            <CopyAndShare text={shareData.url ?? ""} shareData={shareData} />
          </footer>
        </section>
      </main>
      <Footer categories={data.categories} />
    </Fragment>
  );
}, scope);
