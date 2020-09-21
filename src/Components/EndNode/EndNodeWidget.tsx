import React from "react";
import { EndNodeModel } from "./EndNodeModel";
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";
import { colour } from "../../Types";

export interface EndNodeWidgetProps {
  node: EndNodeModel;
  engine: DiagramEngine;
  size?: number;
  name?: string;
}

export const Port = styled.div`
  width: 16px;
  height: 16px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 1);
  }
`;

export class EndNodeWidget extends React.Component<EndNodeWidgetProps> {
  render() {
    return (
      <div
        className={this.props.name}
        style={{
          position: "relative",
          width: this.props.size,
          height: this.props.size,
        }}
      >
        <svg
          width={this.props.size}
          height={this.props.size}
          dangerouslySetInnerHTML={{
            __html: `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <circle cx="50" cy="50" r="40" fill=${colour.end} stroke="${
              this.props.node.isSelected() ? "black" : colour.end
            }" stroke-width="3" stroke-miterlimit="10" points="10"/>
          </g>
        `,
          }}
        />
        <PortWidget
          style={{
            bottom: this.props.size / 1.1,
            right: this.props.size / 2 - 8,
            position: "absolute",
          }}
          port={this.props.node.getPort(PortModelAlignment.TOP)}
          engine={this.props.engine}
        >
          <Port />
        </PortWidget>
      </div>
    );
  }
}
