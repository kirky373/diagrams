import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { DefaultNodeModel, DiagramModel } from "@projectstorm/react-diagrams";
import _ from "lodash";

//TODO: Remove the custom node name which is null/empty
//      Pass the node name to the selected node to be able to add ports
/* function DropDown(model) {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  const nodeNames = nodes.map((node) => (
    <Dropdown.Item
      onClick={() => handleNodeNameInput(node.getOptions().name)}
      key={node.getOptions().name}
    >
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
} */

interface DropDownProps {
  model: DiagramModel;
  className?: string;
}
interface State {
  name: string;
}
export default class DropDown extends React.Component<DropDownProps, State> {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleNodeNameInput(name) {
    console.log(name);
    this.setState({ name: name });
  }

  nodes: DefaultNodeModel[] = _.values(
    this.props.model.getNodes()
  ) as DefaultNodeModel[];

  nodeNames = this.nodes.map((node) => (
    <Dropdown.Item
      onClick={() => this.handleNodeNameInput(node.getOptions().name)}
      key={node.getOptions().name}
    >
      {node.getOptions().name}
    </Dropdown.Item>
  ));
  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select a node
          </Dropdown.Toggle>
          <Dropdown.Menu>{this.nodeNames}</Dropdown.Menu>
        </Dropdown>
        <h5>Node name: {this.state.name}</h5>
      </div>
    );
  }
}
