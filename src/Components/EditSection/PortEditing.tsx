import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import _ from "lodash";

//TODO: Add selection logic for in and out ports
export function addPorts(
  model: DiagramModel,
  engine: DiagramEngine,
  selectedNodeName: String,
  portInput: String
) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    console.log(selectedNodeName);
    if (node.getOptions().name === selectedNodeName && portInput !== "") {
      console.log("Adding");
      node.addInPort(`${portInput}-in`, false);
    }
  }
  engine.repaintCanvas();
}
//TODO: Remove any links to selected ports
export function deletePorts(
  model: DiagramModel,
  engine: DiagramEngine,
  nodeName: String,
  portInput: String
) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    if (node.getOptions().name === nodeName) {
      let ports = node.getInPorts();
      ports.forEach(function (port) {
        if (port.getName() === portInput) {
          console.log("Found");
          node.removePort(port);
        }
      });
    }
  }
  engine.repaintCanvas();
}
