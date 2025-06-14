import { useEffect } from "react";

const useDynamicTitle = (title) => {
  useEffect(() => {
    document.title = `Kind Hands | ${title}`;
  }, [title]);
};

export default useDynamicTitle;