import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

//TODO: Pass the node name to the selected node to be able to add ports
const DropDown = (props) => {
  const [nodeName, setNodeName] = useState();
  const handleNodeNameInput = (name: any) => {
    setNodeName(name);
  };
  let items = props.nodeNames.map((node) => {
    return (
      <Dropdown.Item onClick={() => handleNodeNameInput(node)}>
        {node}
      </Dropdown.Item>
    );
  });
  return (
    <React.Fragment>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select a node
        </Dropdown.Toggle>
        <Dropdown.Menu>{items}</Dropdown.Menu>
      </Dropdown>
      <h5>Node name: {nodeName}</h5>
    </React.Fragment>
  );
};

export default DropDown;
