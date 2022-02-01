import styled from "@emotion/styled";
import { Button, Link } from "@mui/material";
import { useQuery } from "react-query";
import { Link as RouterLink, useParams } from "react-router-dom";

const Container = styled.div`
  margin: 32px auto;
  justify-content: center;
  display: flex;

  div {
    margin: 0px 32px;
    width: 25%;
  }
`;

export const Dossier = () => {
  // const [queryRefetch, setQueryFetch] = useState(true);
  const params = useParams();
  const { isLoading, error, data, isFetching } = useQuery(
    `dossier-${params.id}`,
    () =>
      fetch(
        `https://15677b7a-534d-4ec6-bd71-83e1d19d8ec7.mock.pstmn.io/odos/movies/${params.id}`
      ).then((res) => res.json())
  );
  if (data && !isLoading)
    return (
      <Container>
        <img alt={data.name} src={data.url} />
        <div>
          <Button variant="outlined">
            <Link component={RouterLink} to="/">
              Back
            </Link>
          </Button>
          <h2>{data.name}</h2>
          <p>
            <span>{data.description}</span>
          </p>
        </div>
      </Container>
    );
  else return <Container />;
};
