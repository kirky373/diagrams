import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { EndPortModel } from "./EndPortModel";
import { END } from "../../Types";

export interface EndNodeModelGenerics {
  PORT: EndPortModel;
}

export class EndNodeModel extends NodeModel<
  NodeModelGenerics & EndNodeModelGenerics
> {
  constructor() {
    super({
      type: END,
    });
    this.addPort(new EndPortModel(PortModelAlignment.TOP));
  }
}
