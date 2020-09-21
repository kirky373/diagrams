import React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { EndNodeModel } from "./EndNodeModel";
import { EndNodeWidget } from "./EndNodeWidget";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { END } from "../../Types";

export class EndNodeFactory extends AbstractReactFactory<
  EndNodeModel,
  DiagramEngine
> {
  constructor() {
    super(END);
  }

  generateReactWidget(event): JSX.Element {
    return (
      <EndNodeWidget
        engine={this.engine}
        size={100}
        name="End node"
        node={event.model}
      />
    );
  }
  generateModel() {
    return new EndNodeModel();
  }
}
