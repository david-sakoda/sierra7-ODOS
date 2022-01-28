import styled from "@emotion/styled";
import { useEffect } from "react";
import { Dendogram } from "..";
import { SampleData } from "../shared/Dendogram";

const D3Container = styled.div`
  height: calc(100% / 2);
  width: 100vw;
  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
`;

export const Visualization = () => {
  useEffect(() => Dendogram({ height: 800, width: 800, data: SampleData }));

  return(<D3Container id="d3-container" />)
  
};
