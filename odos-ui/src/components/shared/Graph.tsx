import {
  ResponsiveNetwork,
  InputNode,
  InputLink,
  NodeTooltipProps,
} from "@nivo/network";
import styled from "@emotion/styled";

interface ODOSNode extends InputNode {
  id: string;
  name: string;
  gender: string;
}

type InputData = {
  nodes: ODOSNode[];
  links: InputLink[];
};

type GraphProps = {
  data: InputData;
};

const GraphContainer = styled.div`
  height: 500px;
  width: 500px;
`;

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const ToolTip = (props: NodeTooltipProps<ODOSNode>) => {
  return (
    <div style={{display:"flex", flexDirection:"column", backgroundColor: "white", border: "1px solid grey", borderRadius: "2px", padding: "8px"}}>
      <span>Name: {props.node.data.name}</span>
      <span>Gender: {props.node.data.gender}</span>
    </div>
  );
};

export const Graph = ({ data }: GraphProps) => {
  return (
    <GraphContainer className="Graph-Vis">
      <ResponsiveNetwork
        data={data}
        repulsivity={40}
        linkBlendMode="multiply"
        motionConfig="wobbly"
        nodeTooltip={ToolTip}
        nodeColor={function (e) {
          return `#${getRandomColor()}`;
        }}
      />
    </GraphContainer>
  );
};
