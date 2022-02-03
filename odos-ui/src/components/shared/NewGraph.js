import { Graph } from 'react-d3-graph';
import * as d3 from "d3";


// graph payload (with minimalist structure)
const data = {
     links: [
         // Groups
         {
             source: "Marvel",
             target: "Heroes",
         },
         {
             source: "Marvel",
             target: "Villains",
         },
         {
             source: "Marvel",
             target: "Teams",
         },
         // Heroes
         {
             source: "Heroes",
             target: "Spider-Man",
         },
         {
             source: "Heroes",
             target: "CAPTAIN MARVEL",
         },
         {
             source: "Heroes",
             target: "HULK",
         },
         {
             source: "Heroes",
             target: "Black Widow",
         },
         {
             source: "Heroes",
             target: "Daredevil",
         },
         {
             source: "Heroes",
             target: "Wolverine",
         },
         {
             source: "Heroes",
             target: "Captain America",
         },
         {
             source: "Heroes",
             target: "Iron Man",
         },
         {
             source: "Heroes",
             target: "THOR",
         },
         // Villains
         {
             source: "Villains",
             target: "Dr. Doom",
         },
         {
             source: "Villains",
             target: "Mystique",
         },
         {
             source: "Villains",
             target: "Red Skull",
         },
         {
             source: "Villains",
             target: "Ronan",
         },
         {
             source: "Villains",
             target: "Magneto",
         },
         {
             source: "Villains",
             target: "Thanos",
         },
         {
             source: "Villains",
             target: "Black Cat",
         },
         // Teams
         {
             source: "Teams",
             target: "Avengers",
         },
         {
             source: "Teams",
             target: "Guardians of the Galaxy",
         },
         {
             source: "Teams",
             target: "Defenders",
         },
         {
             source: "Teams",
             target: "X-Men",
         },
         {
             source: "Teams",
             target: "Fantastic Four",
         },
         {
             source: "Teams",
             target: "Inhumans",
         },
     ],
     nodes: [
         // Groups
         {
             id: "Marvel",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/marvel.png",
             size: 500,
             fontSize: 18,
         },
         {
             id: "Heroes",
             symbolType: "circle",
             color: "red",
             size: 300,
         },
         {
             id: "Villains",
             symbolType: "circle",
             color: "red",
             size: 300,
         },
         {
             id: "Teams",
             symbolType: "circle",
             color: "red",
             size: 300,
         },
         // Heroes
         {
             id: "Spider-Man",
             name: "Peter Benjamin Parker",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png",
             size: 400,
         },
         {
             id: "CAPTAIN MARVEL",
             name: "Carol Danvers",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainmarvel.png",
             size: 400,
         },
         {
             id: "HULK",
             name: "Robert Bruce Banner",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png",
             size: 400,
         },
         {
             id: "Black Widow",
             name: "Natasha Alianovna Romanova",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_blackwidow.png",
             size: 400,
         },
         {
             id: "Daredevil",
             name: "Matthew Michael Murdock",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_daredevil.png",
             size: 400,
         },
         {
             id: "Wolverine",
             name: "James Howlett",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_wolverine.png",
             size: 400,
         },
         {
             id: "Captain America",
             name: "Steven Rogers",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainamerica.png",
             size: 400,
         },
         {
             id: "Iron Man",
             name: "Tony Stark",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_ironman.png",
             size: 400,
         },
         {
             id: "THOR",
             name: "Thor Odinson",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_thor.png",
             size: 400,
         },
         // Villains
         {
             id: "Dr. Doom",
             name: "Victor von Doom",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/drdoom.png",
             size: 400,
         },
         {
             id: "Mystique",
             name: "Unrevealed",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/mystique.png",
             size: 400,
         },
         {
             id: "Red Skull",
             name: "Johann Shmidt",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/redskull.png",
             size: 400,
         },
         {
             id: "Ronan",
             name: "Ronan",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/ronan.png",
             size: 400,
         },
         {
             id: "Magneto",
             name: "Max Eisenhardt",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/magneto.png",
             size: 400,
         },
         {
             id: "Thanos",
             name: "Thanos",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/thanos.png",
             size: 400,
         },
         {
             id: "Black Cat",
             name: "Felicia Hardy",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/blackcat.png",
             size: 400,
         },
         // Teams
         {
             id: "Avengers",
             name: "",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/avengers.png",
             size: 400,
         },
         {
             id: "Guardians of the Galaxy",
             name: "",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/gofgalaxy.png",
             size: 400,
         },
         {
             id: "Defenders",
             name: "",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/defenders.png",
             size: 400,
         },
         {
             id: "X-Men",
             name: "",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/xmen.png",
             size: 400,
         },
         {
             id: "Fantastic Four",
             name: "",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/fantasticfour.png",
             size: 400,
         },
         {
             id: "Inhumans",
             name: "",
             svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/inhumans.png",
             size: 400,
         },
     ],
 };

const ddata = {
     nodes: [
       {
         id: "1",
         name: "Andy",
         gender: "male",
       },
       {
         id: "2",
         name: "Betty",
         gender: "female",
       },
       {
         id: "3",
         name: "Cate",
         gender: "female",
       },
       {
         id: "4",
         name: "Dave",
         gender: "male",
       },
       {
         id: "5",
         name: "Ellen",
         gender: "female",
       },
       {
         id: "6",
         name: "Fiona",
         gender: "female",
       },
       {
         id: "7",
         name: "Garry",
         gender: "male",
       },
       {
         id: "8",
         name: "Holly",
         gender: "female",
       },
       {
         id: "9",
         name: "Iris",
         gender: "female",
       },
       {
         id: "10",
         name: "Jane",
         gender: "female",
       },
     ],
     links: [
       {
         source: "1",
         target: "2",
       },
       {
         source: "1",
         target: "5",
       },
       {
         source: "1",
         target: "6",
       },
   
       {
         source: "2",
         target: "3",
       },
       {
         source: "2",
         target: "7",
       },
       {
         source: "3",
         target: "4",
       },
       {
         source: "8",
         target: "3",
       },
       {
         source: "4",
         target: "5",
       },
       {
         source: "4",
         target: "9",
       },
       {
         source: "5",
         target: "10",
       },
     ],
   };

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
     directed: false,
     automaticRearrangeAfterDropNode: true,
     collapsible: true,
     height: 800,
     highlightDegree: 2,
     highlightOpacity: 0.2,
     linkHighlightBehavior: true,
     maxZoom: 12,
     minZoom: 0.05,
     nodeHighlightBehavior: true,
     panAndZoom: false,
     staticGraph: false,
     width: 800,
     d3: {
         alphaTarget: 0.05,
         gravity: -250,
         linkLength: 120,
         linkStrength: 2,
     },
     node: {
         color: "#d3d3d3",
         fontColor: "black",
         fontSize: 10,
         fontWeight: "normal",
         highlightColor: "red",
         highlightFontSize: 14,
         highlightFontWeight: "bold",
         highlightStrokeColor: "red",
         highlightStrokeWidth: 1.5,
         labelProperty: n => (n.name ? `${n.id} - ${n.name}` : n.id),
         mouseCursor: "crosshair",
         opacity: 0.9,
         renderLabel: true,
         size: 200,
         strokeColor: "none",
         strokeWidth: 1.5,
         svg: "",
         symbolType: "circle",
         viewGenerator: null,
     },
     link: {
         color: "lightgray",
         highlightColor: "red",
         mouseCursor: "pointer",
         opacity: 1,
         semanticStrokeWidth: true,
         strokeWidth: 3,
         type: "STRAIGHT",
     },
 };

// Callback to handle click on the graph.
// @param {Object} event click dom event
const onClickGraph = function(event) {
     window.alert('Clicked the graph background');
};

const onClickNode = function(nodeId, node) {
     window.alert(`Clicked node ${nodeId} in position (${node.x}, ${node.y})`);
};

const onDoubleClickNode = function(nodeId, node) {
     window.alert('Double clicked node ${nodeId} in position (${node.x}, ${node.y})');
};

const onRightClickNode = function(event, nodeId, node) {
     window.alert('Right clicked node ${nodeId} in position (${node.x}, ${node.y})');
};

const onMouseOverNode = function(nodeId, node) {
     window.alert(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
};

const onMouseOutNode = function(nodeId, node) {
     window.alert(`Mouse out node ${nodeId} in position (${node.x}, ${node.y})`);
};

const onClickLink = function(source, target) {
     window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
     window.alert('Right clicked link between ${source} and ${target}');
};

const onMouseOverLink = function(source, target) {
     window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
     window.alert(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function(nodeId, x, y) {
     window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
};

// Callback that's called whenever the graph is zoomed in/out
// @param {number} previousZoom the previous graph zoom
// @param {number} newZoom the new graph zoom
const onZoomChange = function(previousZoom, newZoom) {
     window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
};

export const NewGraph = ()=> 
<Graph
     id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
     data={data}
     config={myConfig}
     onClickGraph={onClickGraph}
     onClickNode={onClickNode}
     onDoubleClickNode={onDoubleClickNode}
     onRightClickNode={onRightClickNode}
     onClickLink={onClickLink}
     onRightClickLink={onRightClickLink}
     // onMouseOverNode={onMouseOverNode}
     // onMouseOutNode={onMouseOutNode}
     // onMouseOverLink={onMouseOverLink}
     // onMouseOutLink={onMouseOutLink}
     // onNodePositionChange={onNodePositionChange}
     onZoomChange={onZoomChange}/>