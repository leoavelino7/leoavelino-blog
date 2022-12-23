import { useEffect, useState } from "react";

export const useSupportedNavigatorShare = () => {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.navigator.share !== "undefined") {
      setSupported(true);
    }
  }, []);

  return supported;
};
