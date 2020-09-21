import React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { StartNodeModel } from "./StartNodeModel";
import { StartNodeWidget } from "./StartNodeWidget";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { START } from "../../Types";

export class StartNodeFactory extends AbstractReactFactory<
  StartNodeModel,
  DiagramEngine
> {
  constructor() {
    super(START);
  }

  generateReactWidget(event): JSX.Element {
    return (
      <StartNodeWidget
        engine={this.engine}
        size={100}
        name="Start node"
        node={event.model}
      />
    );
  }
  generateModel() {
    return new StartNodeModel();
  }
}
