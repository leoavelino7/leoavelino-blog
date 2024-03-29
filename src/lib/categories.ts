export namespace CategoriesLib {
  export enum Categories {
    All = "all",
    BackEnd = "back-end",
    Algorithm = "algorithm",
    Packages = "packages",
    FrontEnd = "front-end",
    Database = "database",
    SoftSkills = "soft-skills",
    Default = "default"
  }

  const categories: Array<Omit<Categories, "default">> = [
    Categories.All,
    Categories.BackEnd,
    Categories.Algorithm,
    Categories.Packages,
    Categories.FrontEnd,
    Categories.Database,
    Categories.SoftSkills
  ];

  export const categoriesColor = {
    [Categories.All]: "text-primary bg-primary-light",
    [Categories.BackEnd]: "text-paper bg-back-end ",
    [Categories.Algorithm]: "text-paper bg-algorithm",
    [Categories.Packages]: "text-paper bg-packages",
    [Categories.FrontEnd]: "text-paper bg-front-end",
    [Categories.Database]: "text-paper bg-database",
    [Categories.SoftSkills]: "text-paper bg-soft-skills",
    [Categories.Default]: "text-neutral"
  };

  export const categoriesEvent = {
    [Categories.All]: "hover:text-primary hover:bg-primary-light",
    [Categories.BackEnd]: "hover:text-paper hover:bg-back-end",
    [Categories.Algorithm]: "hover:text-paper hover:bg-algorithm",
    [Categories.Packages]: "hover:text-paper hover:bg-packages",
    [Categories.FrontEnd]: "hover:text-paper hover:bg-front-end",
    [Categories.Database]: "hover:text-paper hover:bg-database",
    [Categories.SoftSkills]: "hover:text-paper hover:bg-soft-skills",
    [Categories.Default]: "hover:text-neutral hover:bg-primary"
  };

  export const getCategory = (category: string): Categories => (categories.includes(category) ? (category as Categories) : Categories.All);
}
