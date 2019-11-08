import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = () => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      setIsFetching(true);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useCallback(() => {
    if (!isFetching) return;
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
