import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import _ from "lodash";

//TODO: Remove the custom node name which is null/empty
//      Pass the node name to the selected node to be able to add ports
function DropDown(model) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  const nodeNames = nodes.map((node) => (
    <Dropdown.Item key={node.getOptions().name}>
      {node.getOptions().name}
    </Dropdown.Item>
  ));
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select a node
      </Dropdown.Toggle>
      <Dropdown.Menu>{nodeNames}</Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
