import React from "react";
import "./App.css";
import createEngine, { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { TrayWidget } from "./Components/TrayWidget";
import { TrayItemWidget } from "./Components/TrayItemWidget";
import styled from "@emotion/styled";
import DefaultDiagram from "./Components/DefaultDiagram";
import { In, Out, Connection } from "./Types";

import CustomTest from "./Components/CustomNode/testindex";

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
const engine = setEngine();

function setEngine() {
  let engine = createEngine();
  engine.setModel(model);
  return engine;
}

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
                console.log(x);
                var node: DefaultNodeModel;
                if (data.type === In) {
                  node = new DefaultNodeModel("In node", "rgb(192,255,0)");
                  node.addInPort(In);
                } else if (data.type === Out) {
                  node = new DefaultNodeModel("Out node", "rgb(0,192,255)");
                  node.addOutPort(Out);
                } else if (data.type === Connection) {
                  node = new DefaultNodeModel(
                    "Connection node",
                    "rgb(255,192,0)"
                  );
                  node.addInPort(In);
                  node.addOutPort(Out);
                } else {
                  node = new DefaultNodeModel("Error node", "rgb(255,0,0)");
                }

                //TODO: Get this working to add nodes to the model where user drops them
                node.setPosition(x, y);

                model.addAll(node);
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
            <GridContainer color="#5f5f5f" background="white">
              <CanvasWidget engine={engine} />
            </GridContainer>
            <GridContainer color="#5f5f5f" background="white">
              <CustomTest />
            </GridContainer>
          </Layer>
          <TrayWidget>
            <TrayItemWidget
              model={{ type: In }}
              name="In Node"
              color="rgb(192,255,0)"
            />
            <TrayItemWidget
              model={{ type: Out }}
              name="Out Node"
              color="rgb(0,192,255)"
            />
            <TrayItemWidget
              model={{ type: Connection }}
              name="Conenction Node"
              color="rgb(255,192,0)"
            />
          </TrayWidget>
        </Content>
      </div>
    );
  }
}
