import React from "react";
import "./App.css";
import createEngine, {
  DefaultNodeModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { TrayWidget } from "./Components/Tray/TrayWidget";
import { TrayItemWidget } from "./Components/Tray/TrayItemWidget";
import styled from "@emotion/styled";
import DefaultDiagram from "./Components/DefaultDiagram";
import { IN, OUT, CONNECTION, CUSTOM, colour } from "./Types";
import { CustomNodeModel } from "./Components/CustomNode/CustomNodeModel";
import { SimplePortFactory } from "./Components/CustomNode/SimplePortFactory";
import { CustomNodeFactory } from "./Components/CustomNode/CustomNodeFactory";
import { CustomPortModel } from "./Components/CustomNode/CustomPortModel";
import {
  addPorts,
  deletePorts,
  handlePortNameInput,
  handleNodeNameInput,
} from "./Components/PortEditing";

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

const model = DefaultDiagram;
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
  engine.getNodeFactories().registerFactory(new CustomNodeFactory());
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

export default class diagram extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => engine.zoomToFitNodes(20)}>Zoom to fit</button>
        <button onClick={() => addPorts(model, engine)}>
          Add a port to a node(WIP)
        </button>
        <button onClick={() => deletePorts(model, engine)}>
          Delete a port to a node(WIP)
        </button>
        <form>
          <InputArea>
            <label>
              <InputNames>Node name: </InputNames>
              <input
                type="text"
                defaultValue=""
                onChange={handleNodeNameInput}
              />
            </label>
          </InputArea>
          <InputArea>
            <label>
              <InputNames>Port name: </InputNames>
              <input
                type="text"
                defaultValue=""
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
                  default:
                    node = new DefaultNodeModel("Error node", colour.custom);
                }

                model.addAll(node, customNode);
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
          <TrayWidget>
            <TrayItemWidget
              model={{ type: IN }}
              name="In Node"
              color={colour.in}
            />
            <TrayItemWidget
              model={{ type: OUT }}
              name="Out Node"
              color={colour.out}
            />
            <TrayItemWidget
              model={{ type: CONNECTION }}
              name="Connection Node"
              color={colour.connection}
            />
            <TrayItemWidget
              model={{ type: CUSTOM }}
              name="Custom Node"
              color={colour.custom}
            />
          </TrayWidget>
        </Content>
      </div>
    );
  }
}
