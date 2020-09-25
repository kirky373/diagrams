import React from "react";
import { addPorts, deletePorts } from "./EditSection/PortEditing";
import serializeModel from "./Utility/SerializeModel";
import deserializeJSONModel from "./Utility/DeserializeJSONModel";

const ButtonBar = (props) => {
  const { model, engine, selectedNodeName, portInput } = props;
  return (
    <React.Fragment>
      <button onClick={() => engine.zoomToFitNodes(20)}>Zoom to fit</button>
      <button
        onClick={() => addPorts(model, engine, selectedNodeName, portInput)}
      >
        Add a port to a node(WIP)
      </button>
      <button
        onClick={() => deletePorts(model, engine, selectedNodeName, portInput)}
      >
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
