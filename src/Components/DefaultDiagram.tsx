import { DiagramModel, DefaultNodeModel } from "@projectstorm/react-diagrams";
import { In, Out } from "../Types";

const model = DefaultDiagram();
function DefaultDiagram() {
  //node 1
  const node1 = new DefaultNodeModel({
    name: "Out node",
    color: "rgb(0,192,255)",
  });
  node1.setPosition(100, 200);
  let port1 = node1.addOutPort(Out);

  //node 2
  const node2 = new DefaultNodeModel({
    name: "Connection node",
    color: "rgb(255,192,0)",
  });
  node2.setPosition(225, 100);
  let port2 = node2.addInPort(In);
  let port3 = node2.addOutPort(Out);

  //node 3
  const node3 = new DefaultNodeModel({
    name: "In node",
    color: "rgb(192,255,0)",
  });
  node3.setPosition(400, 200);
  let port4 = node3.addInPort(In);

  //link them and add a label to the link
  const link = port1.link(port2);
  const link2 = port3.link(port4);
  const link3 = port1.link(port4);
  //link.addLabel("Hello World!"); Does not work with react strict mode in index

  const model = new DiagramModel();
  model.addAll(node1, node2, link);

  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      generateNodes(model, (i + 2) * 200, j * 100);
    }
  }
  //model.setGridSize(20);
  //model.setLocked(true);
  model.addAll(node1, node2, node3, link, link2, link3);

  return model;
}

function generateNodes(model: DiagramModel, offsetX: number, offsetY: number) {
  //create a default node
  var node1 = new DefaultNodeModel("Test out node", "rgb(0,192,255)");
  var port1 = node1.addOutPort(Out);
  node1.setPosition(100 + offsetX, 100 + offsetY);

  //create another default node
  var node2 = new DefaultNodeModel("Test in node", "rgb(192,255,0)");
  var port2 = node2.addInPort(In);
  node2.setPosition(200 + offsetX, 100 + offsetY);

  //link the 2 nodes together
  var link1 = port1.link(port2);

  //add the models to the root graph
  model.addAll(node1, node2, link1);
}

export default model;
