export const AppLinks = {
  home: () => `/`,
  github: "https://github.com/leoavelino7",
  githubBlog: "https://github.com/leoavelino7/leoavelino",
  homeCategories: (categories: string) => `/#${categories}`,
  homeCategory: (category: string) => `/#categorias?category=${category}`,
  post: (slug: string) => `/post/${slug}`
} as const;
