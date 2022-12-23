import { Categories } from "../../categories";

export const LocalCategories = (): Categories.Constructor => {
  const categories: Array<Categories.Category> = [
    {
      id: "1",
      label: "Front End",
      image: "/icons/computer.svg",
      slug: "front-end",
    },
    {
      id: "2",
      label: "Back End",
      image: "/icons/settings.svg",
      slug: "back-end",
    },
    {
      id: "3",
      label: "Soft Skills",
      image: "/icons/hand-love.svg",
      slug: "soft-skills",
    },
    {
      id: "4",
      label: "Database",
      image: "/icons/database.svg",
      slug: "database",
    },
  ];

  const getAll = (): Categories.Category[] => categories;

  const getBySlug = (slug: string) =>
    categories.find((category) => category.slug === slug);

  return {
    getAll,
    getBySlug,
  };
};
