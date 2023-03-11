import { compareAsc, compareDesc } from "date-fns";

export const isNull = (something: any): something is null => something === null;

export const slugify = (text: string = "") => {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, "-") // Replace _ with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
};

export const sorterBy = <T extends Object>(list: Array<T>, key: keyof T, mode: "ASC" | "DESC", locale: string) => {
  return list.sort((a, b) => {
    const valueA = a[key] as any;
    const valueB = a[key] as any;

    const compareByDate = valueA instanceof Date;
    if (compareByDate) {
      const compareFn = mode === "ASC" ? compareAsc : compareDesc;
      return compareFn(new Date(valueA), new Date(valueB));
    }

    return new Intl.Collator(locale, { sensitivity: "base" }).compare(valueA, valueB);
  });
};
