class Node {
  constructor(name, number, total) {
    this.angle = number * (360/total);

    this.x = radius * Math.sin(Math.PI * 2 * this.angle / 360) + windowWidth / 2;
    this.y = radius * Math.cos(Math.PI * 2 * this.angle / 360) + windowHeight / 2;

    this.name = name;
  }

  draw() {
    stroke(255, 0, 0);
    strokeWeight(20);
    point(this.x, this.y);
    noStroke();
    textSize(32);
    text(this.name, this.x + 10, this.y + 10);
  }
}

class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices)
  {
      this.edges = {};
      this.nodes = [];
      this.totalNodes = noOfVertices;
  }

  addNode(node) {
    var n = new Node(node, this.nodes.length, this.totalNodes);
    this.nodes.push(n);
    this.edges[node] = [];
 }

 addEdge(node1, node2, weight = 1) {
    this.edges[node1].push({ node: node2, weight: weight });
    this.edges[node2].push({ node: node1, weight: weight });
 }

 addDirectedEdge(node1, node2, weight = 1) {
    this.edges[node1].push({ node: node2, weight: weight });
 }

 display() {
    let graph = "";
    this.nodes.forEach(node => {
       graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
    });
    console.log(graph);
 }

 p5display() {
   this.nodes.forEach(node => {

     this.edges[node.name].forEach(edge => {
      //  console.log(node, edge);

       var destNode = this.nodes.filter(obj => {
        return obj.name === edge.node
      })[0];

      stroke(0, 0, 255);
      strokeWeight(2);
      line(node.x, node.y, destNode.x, destNode.y);
      noStroke();
      textSize(20);
      fill(0);
      text(edge.weight, (node.x+destNode.x)/2, (node.y+destNode.y)/2);
     })

     node.draw();
   })
 }
}


let data;
graph = new Graph(7);


function preload() {
  data = loadStrings('resources/small-graph.txt');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  radius = windowWidth / 4;

  

  data.forEach(line => {
    lineType = line.split(" ").length;

    if(lineType == 1) {
      graph.addNode(line);
    } else if(lineType == 3) {
      graph.addEdge(...line.split(" "));
    }
  })
}

function highlightNode(node) {
  noFill();
  strokeWeight(5);
  stroke(0);
  circle(node.x, node.y, 30);
}

function draw() {
  background(255);
  graph.p5display();
  highlightNode(graph.nodes[0]);
}