import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { StartPortModel } from "./StartPortModel";
import { START } from "../../Types";

export interface StartNodeModelGenerics {
  PORT: StartPortModel;
}

export class StartNodeModel extends NodeModel<
  NodeModelGenerics & StartNodeModelGenerics
> {
  constructor() {
    super({
      type: START,
    });
    this.addPort(new StartPortModel(PortModelAlignment.BOTTOM));
  }
}
