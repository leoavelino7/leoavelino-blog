import { Nullable } from "src/lib/types";
import { LocalCategories } from "./Impl/local/categories";
import { Implementations } from "./types";
import { CategoriesLib } from "../../lib/categories";

const implementations: Record<Implementations, () => Categories.Constructor> = {
  local: LocalCategories
};

export namespace Categories {
  export type Category = {
    id: string;
    label: string;
    image: string;
    slug: CategoriesLib.Categories;
  };

  export type Constructor = {
    getAll: () => Array<Category>;
    getBySlug: (slug: string) => Nullable<Category>;
  };

  export const FromEnv = implementations[Implementations.Local];
}
