import { CategoriesLib } from "src/lib/categories";
import { Categories } from "../../categories";

export const LocalCategories = (): Categories.Constructor => {
  const categories: Array<Categories.Category> = [
    {
      id: "1",
      label: "Front End",
      image: "/icons/computer.svg",
      slug: CategoriesLib.Categories.FrontEnd
    },
    {
      id: "2",
      label: "Back End",
      image: "/icons/settings.svg",
      slug: CategoriesLib.Categories.BackEnd
    },
    {
      id: "3",
      label: "Soft Skills",
      image: "/icons/hand-love.svg",
      slug: CategoriesLib.Categories.SoftSkills
    },
    {
      id: "4",
      label: "Database",
      image: "/icons/database.svg",
      slug: CategoriesLib.Categories.Database
    },
    {
      id: "5",
      label: "Algorithm",
      image: "/icons/settings.svg",
      slug: CategoriesLib.Categories.Algorithm
    },
    {
      id: "6",
      label: "Packages",
      image: "/icons/settings.svg",
      slug: CategoriesLib.Categories.Packages
    },
  ];

  const getAll = (): Categories.Category[] => categories;

  const getBySlug = (slug: string) => categories.find((category) => category.slug === slug);

  return {
    getAll,
    getBySlug
  };
};
