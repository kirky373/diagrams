import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import _ from "lodash";
const DropDown = (props) => {
  const { currentSelected, handleSelection, model, engine } = props;
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  let data = [,];
  for (let node of nodes) {
    if (node.getOptions().name !== undefined) {
      data.push([node.getOptions().id, node.getOptions().name]);
    }
  }
  let items = data.map(function (node) {
    return (
      <Dropdown.Item onClick={() => handleSelection(node)}>
        {node[1]}
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
      <h5>Node name: {currentSelected}</h5>
    </React.Fragment>
  );
};

export default DropDown;
