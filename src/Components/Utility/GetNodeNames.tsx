import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import _ from "lodash";
export default (model) => {
  const nodes: DefaultNodeModel[] = _.values(
    model.getNodes()
  ) as DefaultNodeModel[];

  const nodeNames = nodes.map((node) => node.getOptions().name);

  return nodeNames;
};
