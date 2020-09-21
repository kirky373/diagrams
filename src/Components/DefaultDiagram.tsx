import { DiagramModel } from "@projectstorm/react-diagrams";
import { StartNodeModel } from "./StartNode/StartNodeModel";
import { EndNodeModel } from "./EndNode/EndNodeModel";

export default () => {
  const startNode = new StartNodeModel();
  startNode.setPosition(100, 50);

  const endNode = new EndNodeModel();
  endNode.setPosition(700, 400);

  const model = new DiagramModel();
  model.addAll(startNode, endNode);

  return model;
};
