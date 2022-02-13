import styled from "@emotion/styled";
import { Search as SearchIcon } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { MovieCard } from "@/components";
import { useFetchMovies } from "@/hooks";

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

  const { isLoading, error, data } = useFetchMovies();

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
