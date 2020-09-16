import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import ModelData from "../JSON-model.json";
import { CustomNodeFactory } from "./CustomNode/CustomNodeFactory";

export default (engine: DiagramEngine) => {
  registerFactory(new CustomNodeFactory(), engine);
  var model = new DiagramModel();
  var data = JSON.stringify(ModelData);
  model.deserializeModel(JSON.parse(data), engine);
  return model;
};

function registerFactory(factory, engine) {
  engine.getNodeFactories().registerFactory(factory);
}
