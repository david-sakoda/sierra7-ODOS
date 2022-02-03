import styled from "@emotion/styled";
import { useState } from "react";
import { useQuery } from "react-query";
import { MovieCard } from "..";
import { InputAdornment, TextField } from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material"
import { config } from "../../config";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: 16px;
`;

const Container = styled.div`
  height: calc(100% / 2);
  display: grid;
  gap: 24px;
  padding: 16px;
  grid-template-columns: repeat(auto-fill, 345px);
  justify-content: center;
`;

export const Search = () => {
  const [queryRefetch, setQueryFetch] = useState(true);
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      `${config.api.URL}/odos/movies`
    ).then((res) => res.json())
  );

  if (data && !isLoading)
    return (
      <PageContainer>
        <TextField
          id="search-field"
          label="Search by movie title, actor, movie charactor"
          variant="outlined"
          InputProps={{endAdornment : (<InputAdornment position="end"><SearchIcon /></InputAdornment>)}}
        />
        <Container>
          {!isLoading &&
            !error &&
            Array.isArray(data) &&
            data.map((e: any) => (
              <MovieCard
                id={e.id}
                name={e.name}
                description={e.description}
                url={e.url}
              />
            ))}
        </Container>
      </PageContainer>
    );
  else return <Container />;
};
