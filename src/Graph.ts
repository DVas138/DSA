import {Dictionary} from "./Dictionary";
import Queue from "./Queue";
import Stack from "./Stack";
type SN = string | number;

enum Colors {
    White = 0,
    Gray = 1,
    Black = 2
}

const initiateColor = (vertices: SN[]) => {
    const colors:{[key: SN] : number} = {}
    for (let i of vertices) {
        colors[i] = Colors.White
    }
    return colors
}
class Graph {
    vertices: (string | number)[] = []
    adjustList: Dictionary<(string | number), typeof this.vertices> = new Dictionary()
    constructor(private isDirected = false) { }

    addVertex(v: string | number){
        if(! this.vertices.includes(v)) {
            this.vertices.push(v)
            this.adjustList.set(v, [])
        }
    }

    addEdge(v: SN, g: SN){
        if(!this.vertices.includes(v)) {
            this.addVertex(v)
        }
        if(!this.vertices.includes(g)) {
            this.addVertex(g)
        }
        this.adjustList.get(v)?.push(g);
        if(!this.isDirected) {
            this.adjustList.get(g)?.push(v)
        }
    }

    getVertices() {
        return this.vertices
    }
    getEdges(){
        return this.adjustList
    }

    toString() {
        let s = ''
        for (let i = 0 ; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `
            const neighbors = this.adjustList.get(this.vertices[i]);
            if (neighbors)
            for (let ii = 0; ii < neighbors?.length; ii++) {
                s += `${neighbors[ii]} `
            }
            s += '\n'
        }
        return s
    }
}

function BFS(graph: Graph, startVertex: SN, callback?: Function) {
    const vertices = graph.getVertices();
    const adjList = graph.getEdges()
    const colors = initiateColor(vertices);
    const queue = new Queue();
    const predecessors: any = {}
    const distance: any = {}
    queue.enqueue(startVertex);

    for (let i = 0 ; i < vertices.length; i++) {
        distance[vertices[i]] = 0
        predecessors[vertices[i]] = null

    }

    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u)
        colors[u] = Colors.Gray
        if (neighbors) {
            for (let i = 0 ; i < neighbors.length; i++) {
                const w = neighbors[i]
                if(colors[w] === Colors.White) {
                    colors[w] = Colors.Gray
                    distance[w] = distance[u] + 1
                    predecessors[w] = u
                    queue.enqueue(w)
                }
            }
        }
        colors[u] = Colors.Black
        // if(callback) {
        //     callback(u)
        // }
    }
    return {distance, predecessors}
}

function DFS(graph: Graph, callback: Function) {
    const vertices = graph.getVertices()
    const adjusted = graph.getEdges()
    const verticesColors = initiateColor(vertices)
    const d: any = {}
    const f: any = {}
    const p :any = {}
    const time = {count: 0}

    for (let i of vertices) {
        f[i] = 0
        d[i] = 0
        p[i] = null
    }
    for (let i of vertices) {
        if (verticesColors[i] === Colors.White) {
            DFSVisit(i, verticesColors, adjusted, d, f, p, time,callback)
        }
    }

    return {discovery : d, finish: f, predecessors: p}
}

function DFSVisit(vertex: SN, colors: any, adjustList: any, d: any, f: any, p: any , time: any, callback?: Function) {
    colors[vertex] = Colors.Gray
    d[vertex] = ++time.count
    // if (callback) {
    //     callback(vertex)
    // }
    const neighbors = adjustList.get(vertex);
    for (let i of neighbors) {
        if (colors[i] === Colors.White) {
            p[i] = vertex
            DFSVisit(i, colors, adjustList,d, f, p, time,callback)
        }
    }
    colors[vertex] = Colors.Black
    f[vertex] = ++time.count
}


const graph = new Graph();
const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
for (let i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i])
}

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("A", "D")
graph.addEdge("C", "D")
graph.addEdge("C", "G")
graph.addEdge("D", "G")
graph.addEdge("D", "H")
graph.addEdge("B", "E")
graph.addEdge("B", "F")
graph.addEdge("B", "I")

console.log(graph.toString())


const printV = (value: SN) => console.log(value + " Visited");
BFS(graph, vertices[0], printV);

const shortestPath = BFS(graph, vertices[0]);
console.log(shortestPath)

const fromVertex = vertices[0];

for (let i of vertices) {

    const path = new Stack();
    for (let v = i; v != fromVertex; v = shortestPath.predecessors[v]) {
        path.push(v)
    }
    path.push(fromVertex);
    let s = path.pop();
    while (!path.isEmpty()) {
        s += ` - ${path.pop()}`
    }
    console.log(s)
}

DFS(graph, printV)