import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import _ from "lodash";
import { IN } from "../../Types";

export function addPorts(
  model: DiagramModel,
  engine: DiagramEngine,
  selectedNodeID: String,
  portInput: String,
  portOption: String
) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];

  for (let node of nodes) {
    if (node.getOptions().id === selectedNodeID && portInput !== "") {
      if (portOption === IN) {
        node.addInPort(`${portInput}`, false);
      } else {
        node.addOutPort(`${portInput}`, false);
      }
    }
  }
  engine.repaintCanvas();
}
//TODO: Remove any links to selected ports
export function deletePorts(
  model: DiagramModel,
  engine: DiagramEngine,
  selectedNodeID: String,
  portInput: String
) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    if (node.getOptions().id === selectedNodeID) {
      let ports = node.getInPorts();
      ports.forEach(function (port) {
        if (port.getName() === portInput) {
          node.removePort(port);
        }
      });
    }
  }
  engine.repaintCanvas();
}
