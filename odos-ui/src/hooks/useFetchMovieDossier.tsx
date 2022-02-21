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
      fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`)
        .then((res) => res.json())
        .then((d) => {
          d.description = `<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Et
        pharetra pharetra massa massa. Pellentesque habitant morbi tristique
        senectus. Eget egestas purus viverra accumsan in nisl nisi
        scelerisque. Luctus accumsan tortor posuere ac ut consequat semper
        viverra nam. Diam vulputate ut pharetra sit amet. Arcu cursus vitae
        congue mauris rhoncus aenean vel. Mi sit amet mauris commodo quis
        imperdiet massa. Malesuada pellentesque elit eget gravida cum sociis
        natoque. Odio pellentesque diam volutpat commodo sed egestas egestas
        fringilla.
        </p>
        <p>
        Sapien et ligula ullamcorper malesuada proin libero nunc. Platea
        dictumst vestibulum rhoncus est pellentesque elit ullamcorper
        dignissim cras. At urna condimentum mattis pellentesque id nibh
        tortor id. Quis auctor elit sed vulputate mi sit amet. Viverra
        maecenas accumsan lacus vel facilisis. Ridiculus mus mauris vitae
        ultricies leo integer. At imperdiet dui accumsan sit amet nulla
        facilisi. Nisi est sit amet facilisis magna etiam. Sagittis orci a
        scelerisque purus. Ipsum faucibus vitae aliquet nec ullamcorper.
        Purus sit amet luctus venenatis lectus magna. Platea dictumst
        quisque sagittis purus sit amet volutpat consequat. Massa tincidunt
        nunc pulvinar sapien et ligula ullamcorper. Sed ullamcorper morbi
        tincidunt ornare massa eget egestas purus viverra.
      </p>`;

          d.director = "Jim Jarmusch";
          d.actors = [
            { name: "Adam Driver", character: "Paterson" },
            { name: "Golshiefteh Farahani", character: "Laura" },
          ];
          d.year = "1999";
          d.genres= ["Drama", "Romance", "Thriller"];
          
          return d;
        }),
        {enabled: enabled}
  );

  return { data, error, isLoading, isFetching, isError };
};
