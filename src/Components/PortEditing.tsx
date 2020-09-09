import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import _ from "lodash";

let portName = "Default";

export function handlePortNameInput(event: { target: { value: string } }) {
  portName = event.target.value;
}
//TODO: Make this so it can select and specific node then add ports
//      Stop the user adding the same name twice otherwise delete will not work
export function addPorts(model: DiagramModel, engine: DiagramEngine) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    if (node.getOptions().name === "In node") {
      node.addInPort(`${portName}-in`, false);
    } else if (node.getOptions().name === "Connection node") {
      node.addInPort(`${portName}-in`, false);
      node.addOutPort(`${portName}-out`, false);
    }
  }
  engine.repaintCanvas();
}
//TODO: Make this work with specific selected nodes
//      Delete links connected to the port
//      Make this work with specific selected ports
export function deletePorts(model: DiagramModel, engine: DiagramEngine) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    if (node.getOptions().name === "In node") {
      let ports = node.getInPorts();
      if (ports.length !== 0) {
        node.removePort(ports[ports.length - 1]);
      }
    } else if (node.getOptions().name === "Connection node") {
      let portsIn = node.getInPorts();
      let portsOut = node.getOutPorts();
      if (portsIn.length !== 0 && portsOut.length !== 0) {
        node.removePort(portsIn[portsIn.length - 1]);
        node.removePort(portsOut[portsOut.length - 1]);
      }
    }
  }
  engine.repaintCanvas();
}
