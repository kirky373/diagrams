import React from "react";
import { addPorts, deletePorts } from "./EditSection/PortEditing";
import serializeModel from "./Utility/SerializeModel";
import deserializeJSONModel from "./Utility/DeserializeJSONModel";
import { renameNode } from "./EditSection/NodeNameEditing";

const ButtonBar = (props) => {
  const {
    model,
    engine,
    selectedNodeID,
    newNodeName,
    portInput,
    portOption,
    setNodeName,
  } = props;
  return (
    <React.Fragment>
      <button onClick={() => engine.zoomToFitNodes(20)}>Zoom to fit</button>
      <button
        onClick={() =>
          addPorts(model, engine, selectedNodeID, portInput, portOption)
        }
      >
        Add a port to a node
      </button>
      <button
        onClick={() =>
          deletePorts(model, engine, selectedNodeID, portInput, portOption)
        }
      >
        Delete a port to a node
      </button>
      <button
        onClick={() =>
          renameNode(model, engine, selectedNodeID, newNodeName, setNodeName)
        }
      >
        Rename node
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
