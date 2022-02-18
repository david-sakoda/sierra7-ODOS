import styled from "@emotion/styled";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { Fab, InputAdornment, TextField } from "@mui/material";
import { MovieCard } from "@/components";
import { useFetchMovies } from "@/hooks";
import { useKeycloak } from "@react-keycloak/web";

const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 66px - 32px);
  flex-direction: column;
  justify-items: center;
  margin: 16px;
  .AddButton {
    position: absolute;
    z-index: 1000;
    bottom: 24px;
    right: 24px;
  }
`;

const Container = styled.div`
  height: calc(100vh - 66px - 32px - 24px);
  display: grid;
  grid-template-columns: repeat(auto-fill, 423px);
  grid-auto-rows: min-content;
  justify-content: space-evenly;
  gap: 24px;
  padding: 16px;
  
`;

export const Search = () => {
  const { isLoading, error, data } = useFetchMovies();
  const user = useKeycloak();
  const roleArray = user.keycloak.idTokenParsed?.resource_access
    ? user.keycloak.idTokenParsed.resource_access["odos-ui"].roles
    : [];
  console.log(roleArray);
  if (data && !isLoading)
    return (
      <PageContainer>
        <TextField
          id="search-field"
          label="Search by movie title, actor, movie charactor"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
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
        {roleArray.includes("SUPERVISOR") && (
          <div className="AddButton">
            <Fab color="primary" aria-label="add" variant="extended">
              <AddIcon /> Add Movie
            </Fab>
          </div>
        )}
      </PageContainer>
    );
  else return <Container />;
};
