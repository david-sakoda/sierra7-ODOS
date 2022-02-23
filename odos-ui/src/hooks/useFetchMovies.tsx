import { useQuery } from "react-query";

export const useFetchMovies = () => {
  const { isLoading, error, data, isFetching, isError } = useQuery("repoData", () =>
    fetch(`${import.meta.env.VITE_API_URL}/movies`).then((res) => res.json())
  );

  return { data, error, isLoading, isFetching, isError};
};
