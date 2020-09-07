import React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";

import { CustomNodeModel } from "./CustomNodeModel";
import { CustomNodeWidget } from "./CustomNodeWidget";

import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class CustomNodeFactory extends AbstractReactFactory<
  CustomNodeModel,
  DiagramEngine
> {
  constructor() {
    super("custom");
  }

  generateReactWidget(event): JSX.Element {
    return (
      <CustomNodeWidget engine={this.engine} size={50} node={event.model} />
    );
  }
  generateModel() {
    return new CustomNodeModel();
  }
}
