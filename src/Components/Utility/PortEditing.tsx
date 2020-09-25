import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import _ from "lodash";

//TODO: Stop the user adding the same name twice otherwise delete will not work
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
//TODO: Make this work with specific selected ports (loop)
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
      if (ports.length !== 0) {
        node.removePort(ports[ports.length - 1]);
      }
    }
  }
  engine.repaintCanvas();
}
