import styled from "@emotion/styled";
import React, { useState } from "react";
import ButtonBar from "./ButtonBar";
import DropDown from "./DropDown";
import GetNodeNames from "./Utility/GetNodeNames";

export const InputArea = styled.div`
  padding: 0px 2px;
  margin: 0px;
`;
export const InputNames = styled.p`
margin: 0px;
padding 0px;
`;

const Editing = (props) => {
  const { model, engine } = props;
  const [nodeName, setNodeName] = useState("None selected");
  const [portName, setPortName] = useState("");
  const handleNodeNameSelection = (name: any) => {
    setNodeName(name);
  };
  const handlePortNameInput = (event: { target: { value: string } }) => {
    setPortName(event.target.value);
  };
  return (
    <React.Fragment>
      <ButtonBar
        model={model}
        engine={engine}
        selectedNodeName={nodeName}
        portInput={portName}
      />

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
      </form>
    </React.Fragment>
  );
};

export default Editing;
