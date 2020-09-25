import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import _ from "lodash";

export default (model) => {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  let names = [];
  nodes.forEach(function (node) {
    if (node.getOptions().name !== undefined) {
      names.push(node.getOptions().name);
    }
  });
  return names;
};
