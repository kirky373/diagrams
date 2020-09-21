import React from "react";
import { addPorts, deletePorts } from "./PortEditing";
import serializeModel from "./SerializeModel";
import deserializeJSONModel from "./DeserializeJSONModel";

const ButtonBar = (props) => {
  const { model, engine, selectedNodeName } = props;
  return (
    <React.Fragment>
      <button onClick={() => engine.zoomToFitNodes(20)}>Zoom to fit</button>
      <button onClick={() => addPorts(model, engine, selectedNodeName)}>
        Add a port to a node(WIP)
      </button>
      <button onClick={() => deletePorts(model, engine, selectedNodeName)}>
        Delete a port to a node(WIP)
      </button>
      <button onClick={() => serializeModel(model)}>
        Serialize the model(WIP)
      </button>
      <button
        onClick={() => engine.setModel(deserializeJSONModel(engine, model))}
      >
        Deserialize the model
      </button>
    </React.Fragment>
  );
};
export default ButtonBar;
