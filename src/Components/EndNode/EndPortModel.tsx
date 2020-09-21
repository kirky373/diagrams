import {
  LinkModel,
  DefaultLinkModel,
  PortModelAlignment,
  PortModel,
} from "@projectstorm/react-diagrams";
import { END } from "../../Types";

export class EndPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: END,
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
