export const AppLinks = {
  home: (locale: string) => `/${locale}`,
  github: "https://github.com/leoavelino7",
  githubBlog: "https://github.com/leoavelino7/leoavelino",
  homeCategories: (locale: string, categories: string) => `/${locale}/#${categories}`,
  homeCategory: (locale: string, category: string) => `/${locale}/#categorias?category=${category}`,
  post: (locale: string, slug: string) => `/${locale}/post/${slug}`
} as const;
