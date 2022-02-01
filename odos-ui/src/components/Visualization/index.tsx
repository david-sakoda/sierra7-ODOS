import styled from "@emotion/styled";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Dendogram } from "..";


const D3Container = styled.div`
  height: calc(100% / 2);
  width: 100vw;
  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
  margin-top: 32px;
`;

export const Visualization = () => {
  const { isLoading, error, data, isFetching } = useQuery("visualization", () =>
    fetch(
      "https://15677b7a-534d-4ec6-bd71-83e1d19d8ec7.mock.pstmn.io/odos/movies/visualization"
    ).then((res) => res.json())
  );
  useEffect(() => {
    if (!isLoading) Dendogram({ height: 800, width: 800, data: data });
  }, [data, isLoading]);

  return <D3Container id="d3-container" />;
};
