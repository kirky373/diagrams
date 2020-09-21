import React from "react";
import "./App.css";
import createEngine, {
  DefaultNodeModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import Tray from "./Components/Tray/Tray";
import styled from "@emotion/styled";
import DefaultDiagram from "./Components/DefaultDiagram";
import { IN, OUT, CONNECTION, CUSTOM, colour, START, END } from "./Types";
import { CustomNodeModel } from "./Components/CustomNode/CustomNodeModel";
import { CustomNodeFactory } from "./Components/CustomNode/CustomNodeFactory";
import { handlePortNameInput } from "./Components/PortEditing";

import DropDown from "./Components/DropDown";
import getNodeNames from "./Components/GetNodeNames";
import ButtonBar from "./Components/ButtonBar";
import { StartNodeModel } from "./Components/StartNode/StartNodeModel";
import { StartNodeFactory } from "./Components/StartNode/StartNodeFactory";
import { SimplePortFactory } from "./Components/SimplePortFactory";
import { CustomPortModel } from "./Components/CustomNode/CustomPortModel";
import { StartPortModel } from "./Components/StartNode/StartPortModel";
import { EndNodeFactory } from "./Components/EndNode/EndNodeFactory";
import { EndPortModel } from "./Components/EndNode/EndPortModel";
import { EndNodeModel } from "./Components/EndNode/EndNodeModel";
export const GridContainer = styled.div<{ color: string; background: string }>`
  height: 60vh;
  background-color: ${(p) => p.background};
  background-size: 50px 50px;
  margin: 5px;
  border-style: Solid;
  display: flex;
  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      ${(p) => p.color} 25%,
      ${(p) => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${(p) => p.color} 75%,
      ${(p) => p.color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${(p) => p.color} 25%,
      ${(p) => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${(p) => p.color} 75%,
      ${(p) => p.color} 76%,
      transparent 77%,
      transparent
    );
`;

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;
export const Layer = styled.div`
  position: relative;
  flex-grow: 1;
`;

export const InputArea = styled.div`
  padding: 0px 2px;
  margin: 0px;
`;
export const InputNames = styled.p`
margin: 0px;
padding 0px;
`;

let model = DefaultDiagram;
let engine = setEngine();

function setEngine() {
  let engine = createEngine();
  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        CUSTOM,
        (config) => new CustomPortModel(PortModelAlignment.LEFT)
      )
    );
  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        START,
        (config) => new StartPortModel(PortModelAlignment.BOTTOM)
      )
    );
  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        START,
        (config) => new EndPortModel(PortModelAlignment.TOP)
      )
    );
  engine.getNodeFactories().registerFactory(new CustomNodeFactory());
  engine.getNodeFactories().registerFactory(new StartNodeFactory());
  engine.getNodeFactories().registerFactory(new EndNodeFactory());
  engine.setModel(model);
  return engine;
}

//TODO: Make this not janky
function checkIfOutOfBoundsX(x: number) {
  if (x > 875) {
    x = 875;
  }
  return x;
}

function checkIfOutOfBoundsY(y: number) {
  if (y > 425) {
    y = 425;
  }
  return y;
}

interface Props {}
interface State {
  nodeNames: string[];
  selectedNodeName: string;
  PortName: string;
}
export default class diagram extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      nodeNames: getNodeNames(model),
      selectedNodeName: "",
      PortName: "",
    };
  }

  render() {
    return (
      <React.Fragment>
        <ButtonBar
          model={model}
          engine={engine}
          selectedNodeName={this.state.selectedNodeName}
        />
        <DropDown
          model={model}
          nodeNames={getNodeNames(model)} /* TODO: Make this have a listener */
        />
        <form>
          <InputArea>
            <label>
              <InputNames>Port name: </InputNames>
              <input
                type="text"
                defaultValue={this.state.PortName}
                onChange={handlePortNameInput}
              />
            </label>
          </InputArea>
        </form>
        <Content>
          <Layer>
            {
              (ondrop = (event: {
                dataTransfer?: any;
                clientX?: number;
                clientY?: number;
              }) => {
                var data = JSON.parse(
                  event.dataTransfer.getData("storm-diagram-node")
                );
                let x = event.clientX!;
                let y = event.clientY!;
                var node: DefaultNodeModel;
                var customNode: CustomNodeModel;
                var startNode: StartNodeModel;
                var endNode: EndNodeModel;
                //TODO: Get this working to add nodes to the model where user drops them
                switch (data.type) {
                  case IN:
                    node = new DefaultNodeModel("In node", colour.in);
                    node.addInPort(IN);
                    x = checkIfOutOfBoundsX(x);
                    y = checkIfOutOfBoundsY(y);
                    node.setPosition(x, y);
                    break;
                  case OUT:
                    node = new DefaultNodeModel("Out node", colour.out);
                    node.addOutPort(OUT);
                    x = checkIfOutOfBoundsX(x);
                    y = checkIfOutOfBoundsY(y);
                    node.setPosition(x, y);
                    break;
                  case CONNECTION:
                    node = new DefaultNodeModel(
                      "Connection node",
                      colour.connection
                    );
                    node.addInPort(IN);
                    node.addOutPort(OUT);
                    x = checkIfOutOfBoundsX(x);
                    y = checkIfOutOfBoundsY(y);
                    node.setPosition(x, y);
                    break;
                  case CUSTOM:
                    customNode = new CustomNodeModel();
                    x = checkIfOutOfBoundsX(x);
                    y = checkIfOutOfBoundsY(y);
                    customNode.setPosition(x, y);
                    break;
                  case START:
                    startNode = new StartNodeModel();
                    x = checkIfOutOfBoundsX(x);
                    y = checkIfOutOfBoundsY(y);
                    startNode.setPosition(x, y);
                    break;
                  case END:
                    endNode = new EndNodeModel();
                    x = checkIfOutOfBoundsX(x);
                    y = checkIfOutOfBoundsY(y);
                    endNode.setPosition(x, y);
                    break;
                  default:
                    node = new DefaultNodeModel("Error node", colour.custom);
                }

                model.addAll(node, customNode, startNode, endNode);
                this.forceUpdate();
              })
            }
            {
              (ondragover = (event: { preventDefault: () => void }) => {
                event.preventDefault();
              })
            }

            <GridContainer color="#5f5f5f" background="white">
              <CanvasWidget engine={engine} />
            </GridContainer>
          </Layer>
          <Tray />
        </Content>
      </React.Fragment>
    );
  }
}
