import { useEffect } from "react";

const useTitle = (title: string, restoreOnUnmount = false) => {
  const defaultTitle = document.title;

  useEffect(() => {
    document.title = "ValidControl - " + title;

    return () => {
      if (restoreOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, [title, restoreOnUnmount]);
};

export default useTitle;
