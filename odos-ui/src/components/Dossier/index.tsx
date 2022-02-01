import styled from "@emotion/styled";
import { useState } from "react";
import { useQuery } from "react-query";
import { MovieCard } from "..";

const Container = styled.div`

`;

export const Dossier = () => {
//     const [queryRefetch, setQueryFetch] = useState(true);
//   const { isLoading, error, data, isFetching } = useQuery(
//     "repoData",
//     () =>
//       fetch(
//         "https://15677b7a-534d-4ec6-bd71-83e1d19d8ec7.mock.pstmn.io/odos/movies"
//       ).then((res) => res.json()),
//     {
//       enabled: queryRefetch,
//       onSettled: ()=> setQueryFetch(false)
//     }
//   );

  return (
    <Container>
      Dossier
    </Container>
  );
};
