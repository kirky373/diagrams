import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
//TODO: Implement this component
export const renameNode = (
  model: DiagramModel,
  engine: DiagramEngine,
  selectedNodeName: string
) => {
  console.log("Renaming " + selectedNodeName);
  model.getOptions().id = "wow you renamed it";
};
