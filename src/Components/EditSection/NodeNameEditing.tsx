import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import _ from "lodash";
export const renameNode = (
  model: DiagramModel,
  engine: DiagramEngine,
  selectedNodeID: string,
  newNodeName: string,
  setNodeName
) => {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    if (node.getOptions().id === selectedNodeID) {
      node.getOptions().name = newNodeName;
      setNodeName(newNodeName);
    }
  }
  engine.repaintCanvas();
};
