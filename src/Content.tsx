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
import _ from "lodash";

export const GridContainer = styled.div<{ color: string; background: string }>`
  height: 50vh;
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

//TODO: Make this so it can select and specific node then add ports
const addPorts = () => {
  console.log("Adding port...");
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  for (let node of nodes) {
    console.log(node.getOptions().name);
    if (node.getOptions().name === "In node") {
      node.addInPort(`In-${node.getInPorts().length + 1}`, false);
    } else if (node.getOptions().name === "Connection node") {
      node.addInPort(`In-${node.getInPorts().length + 1}`, false);
      node.addOutPort(`Out-${node.getOutPorts().length + 1}`, false);
    }
  }
  engine = setEngine();
  engine.repaintCanvas();
};

export default class diagram extends React.Component {
  render() {
    return (
      <div>
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
            <button onClick={() => engine.zoomToFitNodes(20)}>
              Zoom to fit
            </button>
            <button onClick={() => addPorts()}>
              Add a port to a node(WIP)
            </button>
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
