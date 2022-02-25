import { useInfiniteQuery } from "react-query";


export const useFetchMovies = (search?: string) => {
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
    ["repoData",search],
    async ({ pageParam = 0 }) => {
      const results = await fetch(
        `${import.meta.env.VITE_API_URL}/movies/${!search ? "all" : `/moviesearch/${search}`}?from=${pageParam}&size=${pageSize}`,
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
