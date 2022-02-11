import { useQuery } from "react-query";
import { config } from "../config";

export const useFetchMovieDossier = (id: string | undefined) => {
  const { isLoading, error, data, isFetching, isError } = useQuery(
    ["dossier", id],
    () => fetch(`${config.api.URL}/movies/${id}`).then((res) => res.json())
  );

  return { data, error, isLoading, isFetching, isError };
};
