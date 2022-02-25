import { useInfiniteQuery } from "react-query";

export const useFetchMovies = () => {
  const pageSize = 15;

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    "repoData",
    async ({ pageParam = 0 }) => {
      const results = await fetch(
        `${import.meta.env.VITE_API_URL}/movies/all?from=${pageParam}&size=${pageSize}`,
        {
          mode: "cors",
        }
      ).then((res) => res.json());
      return {results, nextPage: pageParam+pageSize, totalPages:100}
    },
    {
      //getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.results.length === pageSize) return lastPage.nextPage;
        return undefined;
      }
       
    }
  );

  // const { isLoading, error, data, isFetching, isError } = useQuery(
  //   "repoData",
  //   () =>
  //     fetch(`${import.meta.env.VITE_API_URL}/movies/all?from=0&size=15`, {
  //       mode: "cors",
  //     }).then((res) => res.json())
  // );

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage: hasNextPage || false,
    hasPreviousPage,
  };
};
