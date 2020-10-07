import styled from "@emotion/styled";
import React, { useState } from "react";
import ButtonBar from "../ButtonBar";
import DropDown from "./NodeDropdown";
import { IN, OUT, RADIO, TEXT } from "../../Types";

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
const Editing = (props) => {
  const { model, engine } = props;
  const [nodeName, setNodeName] = useState();
  const [newNodeName, setNewNodeName] = useState();
  const [nodeID, setNodeID] = useState();
  const [portName, setPortName] = useState("");
  const [portOption, setPortOption] = useState(IN);
  const handleNodeNameSelection = (node) => {
    setNodeID(node[0]);
    setNodeName(node[1]);
  };
  const handlePortNameInput = (event: { target: { value: string } }) => {
    setPortName(event.target.value);
  };
  const handlePortOptionChange = (event) => {
    setPortOption(event.target.value);
  };

  const handleNewNodeNameInput = (event) => {
    setNewNodeName(event.target.value);
  };

  return (
    <React.Fragment>
      <ButtonBar
        model={model}
        engine={engine}
        selectedNodeName={nodeID}
        newNodeName={newNodeName}
        portInput={portName}
        portOption={portOption}
        setNodeName={setNodeName}
      />
      <h3>Edit Nodes</h3>
      <DropDown
        currentSelected={nodeName}
        handleSelection={handleNodeNameSelection}
        model={model}
      />

      <form>
        <InputArea>
          <label>
            <InputNames>Port name: </InputNames>
            <input
              type={TEXT}
              defaultValue={portName}
              onChange={handlePortNameInput}
            />
          </label>
          <label>
            <InputNames>Change node name: </InputNames>
            <input
              type={TEXT}
              defaultValue={nodeName}
              onChange={handleNewNodeNameInput}
            />
          </label>
        </InputArea>
        <PortButton>
          <label>
            <input
              type={RADIO}
              value={IN}
              checked={portOption === IN}
              onChange={handlePortOptionChange}
            />
            In port
          </label>
        </PortButton>
        <PortButton>
          <label>
            <input
              type={RADIO}
              value={OUT}
              checked={portOption === OUT}
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
