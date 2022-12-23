import { compareAsc, compareDesc } from "date-fns";

export const isNull = (something: any): something is null => something === null;

export const slugify = (str: string = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const sorterBy = <T extends Object>(list: Array<T>, key: keyof T, mode: "ASC" | "DESC", locale: string) => {
  return list.sort((a, b) => {
    const valueA = a[key] as any;
    const valueB = a[key] as any;

    const compareByDate = valueA instanceof Date;
    if(compareByDate){
      const compareFn = mode === 'ASC' ? compareAsc : compareDesc;
      return compareFn(new Date(valueA), new Date(valueB));
    }

    return new Intl.Collator(locale, { sensitivity: "base" }).compare(valueA, valueB);
  });
};
