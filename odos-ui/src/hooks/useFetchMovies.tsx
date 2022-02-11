import { useQuery } from "react-query";
import { config } from "../config";

export const useFetchMovies = () => {
  const { isLoading, error, data, isFetching, isError } = useQuery("repoData", () =>
    fetch(`${config.api.URL}/movies`).then((res) => res.json())
  );

  return { data, error, isLoading, isFetching, isError};
};
