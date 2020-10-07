import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import _ from "lodash";

export default (model) => {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];
  let IDs = [];

  nodes.forEach(function (node) {
    IDs.push(node.getOptions().id);
  });
  return IDs;
};
