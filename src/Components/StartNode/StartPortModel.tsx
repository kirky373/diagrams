import {
  LinkModel,
  DefaultLinkModel,
  PortModelAlignment,
  PortModel,
} from "@projectstorm/react-diagrams";
import { START } from "../../Types";

export class StartPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: START,
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
