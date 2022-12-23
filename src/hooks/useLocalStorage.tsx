import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string) {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : null;
  return initial || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      return getStorageValue(key, defaultValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
