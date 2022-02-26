import { Fab, MovieCard } from "@/components";
import { useFetchMovies } from "@/hooks";
import styled from "@emotion/styled";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

const PageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 66px - 32px);
  flex-direction: column;
  justify-items: center;
  margin: 16px;
  .AddButton {
    position: absolute;
    z-index: 1000;
    bottom: 24px;
    right: 24px;
  }
  .loading {
    display: flex;
    justify-content: center;
    margin: 32px;
  }
`;
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const Container = styled(InfiniteScroll)`
  min-height: calc(100vh - 66px - 32px - 24px);
  display: grid;
  grid-template-columns: repeat(auto-fill, 423px);
  grid-auto-rows: min-content;
  justify-content: space-evenly;
  gap: 24px;
  padding: 16px;
  list-style: none;
`;

export const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchValue] = useDebounce<string>(search, 1000);
  const theme = useTheme();
  const TabletUpMatch = useMediaQuery(theme.breakpoints.up("sm"));
  const { error, data, hasNextPage, fetchNextPage, isFetching } =
    useFetchMovies(searchValue);
  const user = useKeycloak();
  const navigate = useNavigate();
  const roleArray = user.keycloak.idTokenParsed?.resource_access
    ? user.keycloak.idTokenParsed.resource_access["odos-ui"].roles
    : [];

  return (
    <>
      <PageContainer>
        <TextField
          id="search-field"
          label="Search by movie title, actor, movie charactor"
          variant="outlined"
          value={search}
          InputLabelProps={{
            style: { fontSize: `${TabletUpMatch ? "1rem" : "0.9rem"}` },
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {data?.pages[0].results.length === undefined && isFetching && (
          <div className="loading">
            <CircularProgress key="loader" />
          </div>
        )}

        {!error && data && (
          <Container
            // variants={containerVariants}
            // initial="hidden"
            // animate="visible"
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
            loader={<CircularProgress key="loader" />}
            initialLoad={false}
          >
            {data.pages.map((page: any) => {
              return page.results.map((movie: any, index: number) => (
                <Fragment key={index}>
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    name={movie.name}
                    description={movie.description}
                    url={movie.url}
                  />
                </Fragment>
              ));
            })}
          </Container>
        )}
      </PageContainer>
      {roleArray.includes("SUPERVISOR") && (
        <div
          className="AddButton"
          style={{
            position: "sticky",
            zIndex: 1000,
            bottom: "24px",
            right: "24px",
          }}
        >
          <Fab
            color="primary"
            label="add"
            onClick={() => navigate("/add")}
            text="Add Movie"
          >
            <AddIcon />
          </Fab>
        </div>
      )}
    </>
  );
};
