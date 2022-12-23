import { Nullable } from "src/lib/types";
import { LocalCategories } from "./Impl/local/categories";
import { Implementations } from "./types";

const implementations: Record<Implementations, () => Categories.Constructor> = {
  local: LocalCategories,
};

export namespace Categories {
  export type Category = {
    id: string;
    label: string;
    image: string;
    slug: string;
  };

  export type Constructor = {
    getAll: () => Array<Category>;
    getBySlug: (slug: string) => Nullable<Category>;
  };

  export const FromEnv = () => implementations[Implementations.Local]();
}
