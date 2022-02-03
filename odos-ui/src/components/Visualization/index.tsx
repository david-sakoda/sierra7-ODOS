import styled from "@emotion/styled";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Dendogram, NewGraph } from "..";
import { config } from "../../config";
const D3Container = styled.div`
  height: calc(100% / 2);
  width: calc(100vw - 32px);
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
      `${config.api.URL}/odos/movies/visualization`
    ).then((res) => res.json())
  );
  useEffect(() => {
    if (!isLoading) Dendogram({ height: 800, width: 800, data: data });
  }, [data, isLoading]);

  return <><D3Container id="d3-container" /></>;
};
