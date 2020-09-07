import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { CUSTOM } from "../../Types";

export class CustomPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: CUSTOM,
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
