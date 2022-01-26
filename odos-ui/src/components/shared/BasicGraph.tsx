import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from "react-vis-force";

type InputData = {
  nodes: {
    id: number;
    name: string;
    gender: string;
  }[];
  links: {
    source: number;
    target: number;
  }[];
};

type GraphProps = {
  data: InputData;
};

export const Graph = (props : GraphProps) => {
  let data = props.data;
  return (
    <InteractiveForceGraph simulationOptions={{ height: 300, width: 300 }}>
      {data.nodes.map((node) => {
        
          return <ForceGraphNode node={{ id: node.id, name: node.name }} fill="red" />;
      })}
      {data.links.map((link) => {
        return <ForceGraphLink link={link} />;
      })}
    </InteractiveForceGraph>
  );
};
