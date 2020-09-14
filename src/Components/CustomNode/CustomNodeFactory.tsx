import React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { CustomNodeModel } from "./CustomNodeModel";
import { CustomNodeWidget } from "./CustomNodeWidget";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { CUSTOM } from "../../Types";

export class CustomNodeFactory extends AbstractReactFactory<
  CustomNodeModel,
  DiagramEngine
> {
  constructor() {
    super(CUSTOM);
  }

  generateReactWidget(event): JSX.Element {
    return (
      <CustomNodeWidget
        engine={this.engine}
        size={50}
        name="Custom node"
        node={event.model}
      />
    );
  }
  generateModel() {
    return new CustomNodeModel();
  }
}
