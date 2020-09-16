import { DiagramModel } from "@projectstorm/react-diagrams";

export default function serializeModel(model: DiagramModel) {
  var JSONModel = JSON.stringify(model.serialize());
  console.log(JSONModel);
}
