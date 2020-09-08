import {
  DiagramModel,
  DefaultNodeModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { IN, OUT, colour } from "../Types";
import { CustomNodeModel } from "./CustomNode/CustomNodeModel";

const model = DefaultDiagram();
function DefaultDiagram() {
  //node 1
  const node1 = new DefaultNodeModel({
    name: "Out node",
    color: colour.out,
  });
  node1.setPosition(100, 200);
  let port1 = node1.addOutPort(OUT);

  //node 2
  const node2 = new DefaultNodeModel({
    name: "Connection node",
    color: colour.connection,
  });
  node2.setPosition(225, 50);
  let port2 = node2.addInPort(IN);
  let port3 = node2.addOutPort(OUT);

  //node 3
  const node3 = new DefaultNodeModel({
    name: "In node",
    color: colour.in,
  });
  node3.setPosition(400, 200);
  let port4 = node3.addInPort(IN);

  const node4 = new CustomNodeModel();
  node4.setPosition(250, 200);

  //link them and add a label to the link
  const link1 = port1.link(node4.getPort(PortModelAlignment.LEFT));
  const link2 = port4.link(node4.getPort(PortModelAlignment.RIGHT));
  const link3 = port2.link(node4.getPort(PortModelAlignment.TOP));
  const link4 = port3.link(node4.getPort(PortModelAlignment.TOP));

  //link.addLabel("Hello World!"); Does not work with react strict mode in index

  const model = new DiagramModel();

  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      generateNodes(model, (i + 2) * 200, j * 100);
    }
  }
  //model.setGridSize(20);
  //model.setLocked(true);
  model.addAll(node1, node2, node3, node4, link1, link2, link3, link4);

  return model;
}

function generateNodes(model: DiagramModel, offsetX: number, offsetY: number) {
  //create a default node
  var node1 = new DefaultNodeModel("Test out node", colour.out);
  var port1 = node1.addOutPort(OUT);
  node1.setPosition(100 + offsetX, 100 + offsetY);

  //create another default node
  var node2 = new DefaultNodeModel("Test in node", colour.in);
  var port2 = node2.addInPort(IN);
  node2.setPosition(200 + offsetX, 100 + offsetY);

  //link the 2 nodes together
  var link1 = port1.link(port2);

  //add the models to the root graph
  model.addAll(node1, node2, link1);
}

export default model;
