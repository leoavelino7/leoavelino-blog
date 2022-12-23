export namespace CategoriesLib {
  export enum Categories {
    All = "all",
    BackEnd = "back-end",
    FrontEnd = "front-end",
    Database = "database",
    SoftSkills = "soft-skills",
    Default = "default",
  }

  export const categoriesColor = {
    [Categories.All]: "text-primary bg-primary-light",
    [Categories.BackEnd]: "text-paper bg-back-end ",
    [Categories.FrontEnd]: "text-paper bg-front-end",
    [Categories.Database]: "text-paper bg-database",
    [Categories.SoftSkills]: "text-paper bg-soft-skills",
    [Categories.Default]: "text-neutral",
  };

  export const categoriesEvent = {
    [Categories.All]: "hover:text-primary hover:bg-primary-light",
    [Categories.BackEnd]: "hover:text-paper hover:bg-back-end",
    [Categories.FrontEnd]: "hover:text-paper hover:bg-front-end",
    [Categories.Database]: "hover:text-paper hover:bg-database",
    [Categories.SoftSkills]: "hover:text-paper hover:bg-soft-skills",
    [Categories.Default]: "hover:text-neutral hover:bg-primary",
  };
}
