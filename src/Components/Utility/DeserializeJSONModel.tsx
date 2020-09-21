import { DiagramEngine } from "@projectstorm/react-diagrams";
import ModelData from "../../JSON-model.json";
import { CustomNodeFactory } from "../CustomNode/CustomNodeFactory";
import { EndNodeFactory } from "../EndNode/EndNodeFactory";
import { StartNodeFactory } from "../StartNode/StartNodeFactory";

export default (engine: DiagramEngine, model) => {
  registerFactory(new CustomNodeFactory(), engine);
  registerFactory(new StartNodeFactory(), engine);
  registerFactory(new EndNodeFactory(), engine);
  var data = JSON.stringify(ModelData);
  model.deserializeModel(JSON.parse(data), engine);
  return model;
};

function registerFactory(factory, engine) {
  engine.getNodeFactories().registerFactory(factory);
}
