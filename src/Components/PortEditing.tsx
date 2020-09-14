import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import _ from "lodash";
//import { nodeName } from "./DropDown";

let portName = "";

export function handlePortNameInput(event: { target: { value: string } }) {
  portName = event.target.value;
}

/* export function handleNodeNameInput(event: { target: { value: string } }) {
  nodeName = event.target.value;
} */

//TODO: Stop the user adding the same name twice otherwise delete will not work
export function addPorts(
  model: DiagramModel,
  engine: DiagramEngine,
  nodeName: String
) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    if (node.getOptions().name === nodeName && portName !== "") {
      node.addInPort(`${portName}-in`, false);
    }
  }
  engine.repaintCanvas();
}
//TODO: Delete links connected to the port
//      Make this work with specific selected ports (loop)
export function deletePorts(
  model: DiagramModel,
  engine: DiagramEngine,
  nodeName: String
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
