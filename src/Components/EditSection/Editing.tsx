import styled from "@emotion/styled";
import React, { useState } from "react";
import ButtonBar from "../ButtonBar";
import DropDown from "./NodeDropdown";
import GetNodeNames from "../Utility/GetNodeNames";

export const InputArea = styled.div`
  padding: 0px 2px;
  margin: 0px;
`;
export const InputNames = styled.p`
margin: 0px;
padding 0px;
`;
export const PortButton = styled.div`
  display: inline;
  padding-right: 10px;
`;
//TODO: Pass selection for in and out ports addition and deletion
const Editing = (props) => {
  const { model, engine } = props;
  const [nodeName, setNodeName] = useState("None selected");
  const [portName, setPortName] = useState("");
  const [portOption, setPortOption] = useState("In");
  const handleNodeNameSelection = (name: any) => {
    setNodeName(name);
  };
  const handlePortNameInput = (event: { target: { value: string } }) => {
    setPortName(event.target.value);
  };
  const handlePortOptionChange = (event) => {
    setPortOption(event.target.value);
  };
  return (
    <React.Fragment>
      <ButtonBar
        model={model}
        engine={engine}
        selectedNodeName={nodeName}
        portInput={portName}
      />
      <h3>Edit Nodes</h3>
      <DropDown
        nodeNames={GetNodeNames(model)}
        currentSelected={nodeName}
        handleSelection={handleNodeNameSelection}
      />

      <form>
        <InputArea>
          <label>
            <InputNames>Port name: </InputNames>
            <input
              type="text"
              defaultValue={portName}
              onChange={handlePortNameInput}
            />
          </label>
        </InputArea>
        <PortButton>
          <label>
            <input
              type="radio"
              value="In"
              checked={portOption === "In"}
              onChange={handlePortOptionChange}
            />
            In port
          </label>
        </PortButton>
        <PortButton>
          <label>
            <input
              type="radio"
              value="Out"
              checked={portOption === "Out"}
              onChange={handlePortOptionChange}
            />
            Out port
          </label>
        </PortButton>
      </form>
    </React.Fragment>
  );
};

export default Editing;
