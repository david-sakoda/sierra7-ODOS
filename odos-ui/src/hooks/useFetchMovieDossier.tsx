import { useQuery } from "react-query";

/* useFetchMovieDossier                                 */
/* id: string - Unique Identifier of the movie to fetch */
/* enabled: bool - Option prop to disable querying.     */
/*                This is used on UpsertMovie to not    */
/*                query when adding a new movie         */

export const useFetchMovieDossier = (id: string | undefined, enabled= true) => {
  const { isLoading, error, data, isFetching, isError } = useQuery(
    ["dossier", id],
    () =>
      fetch(`https://jd75s0eog6.execute-api.us-east-1.amazonaws.com/DEV/dossiers/0069049`)
        .then((res) => res.json())
        .then((d) => {
          

          d.director = d.directors;
          delete d.directors;

          d.actors = d.actors.split(",").map((a: string) => {
            let row = a.split("as");
            return {name: row[0], characters: JSON.parse(row[1])}
          })
          
          d.year = d.releaseYear;
          delete d.releaseYear;

          d.url = d.posterUrl;
          delete d.posterUrl;

          d.genres= d.genres.split(",");
          
          d.plotSummary = d.plotSummary.replace("\n", "<br />")
          return d;
        }),
        {enabled: enabled}
  );

  return { data, error, isLoading, isFetching, isError };
};
