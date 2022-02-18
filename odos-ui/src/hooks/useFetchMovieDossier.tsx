import { useQuery } from "react-query";

export const useFetchMovieDossier = (id: string | undefined) => {
  const { isLoading, error, data, isFetching, isError } = useQuery(
    ["dossier", id],
    () => fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`).then((res) => res.json())
  );

  return { data, error, isLoading, isFetching, isError };
};
