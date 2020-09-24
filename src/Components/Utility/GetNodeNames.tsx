import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import _ from "lodash";

export default (model) => {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];

  const nodeNames = nodes.map((node) => {
    if (node.getOptions().name !== undefined) {
      return node.getOptions().name;
    } else {
      return node.getOptions().type;
    }
  });
  return nodeNames;
};
