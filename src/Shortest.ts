const floydWarshall = (graph: any) => {
    const dist :any = []
    const {length } = graph
    for (let i = 0; i < length; i++) {
        dist[i] = []
        for (let ii = 0; ii < length; ii++) {
            if (i === ii) {
                dist[i][ii] = 0;
            } else if (!isFinite(graph[i][ii])) {
                dist[i][ii] = Infinity
            } else {
                dist[i][ii] = graph[i][ii]
            }
        }
    }
    for (let i = 0; i < length; i++) {
        for (let ii = 0; ii < length; ii++) {
            for (let iii = 0; iii < length; iii++) {
                if (dist[i][ii] + dist[i][iii] < dist[ii][iii]) {
                    dist[ii][iii] = dist[ii][i] + dist[i][iii]
                }
            }
        }
    }
    return dist
}

function minDistance(dist: any, keys:any, visited: any) {
    let min = Infinity
    let minIndex = 0
    for (let i = 0 ; i < dist.length; i++) {
        if (visited[i] === false && keys[i] < min) {
            min = keys[i]
            minIndex = i
        }
    }
    return minIndex
}

const prim = (graph: any) => {
    const parents = []
    const keys = []
    const visited = []
    const {length} = graph
    for (let i = 0; i < length; i++) {
        keys[i] = Infinity
        visited[i] = false
    }
    keys[0] = 0
    parents[0] = -1
    for (let i = 0; i < length -1; i++) {
        const u = minDistance(graph, keys, visited) //index of the node with min value of key from array keys
        visited[u] = true
        for (let v = 0; v < length; v++) {
            if (graph[u][v] && !visited[v] && graph[u][v] < keys[v]) {
                parents[v] = u
                keys[v] = graph[u][v]
            }
        }
    }
    return parents
}

let graph = [
    [0,2,4,0,0,0],
    [2,0,2,4,2,0],
    [4,2,0,0,3,0],
    [0,4,0,0,3,2],
    [0,2,3,3,0,2],
    [0,0,0,2,2,0]
]

console.log(prim(graph))

function initializeCost(graph: number[][]) { //copy the graph as on 0 puts INF
    const cost: number[][] = []
    const {length} = graph
    for (let i = 0; i < length; i++) {
        cost[i] = []
        for (let ii = 0; ii < length; ii++) {
            if (graph[i][ii] === 0) {
                cost[i][ii] = Infinity
            } else {
                cost[i][ii] = graph[i][ii]
            }
        }
    }
    return cost
}

function find(n: number, parent: number[]) {
    while (parent[n]) {
        n = parent[n]
    }
    return n
}

function union(n: number, i: number, parents: number[]) {
    if (n != i) {
        parents[n] = i
        return true
    }
    return false
}

const kruskal = (graph: any) => {
    const {length} = graph
    const parents:number[] = []
    let ne = 0
    let a: number , b: number , u: number , v : number
    const cost = initializeCost(graph)

    while (ne < length) {
        for (let i = 0, min = Infinity; i < length; i++ ) {
            for (let ii = 0 ; ii < length; ii++) {
                if (cost[i][ii] < min) {
                    min = cost[i][ii]
                    a = u = i //left node of edge (outer loop)
                    b = v = ii //right node of the edge (inner loop)
                }
            }
        }
        // @ts-ignore
        if (u && v) {
            u = find(u, parents) // the last parent of u
            v = find(v, parents) // the last parent of v
            if (union(u, v, parents)) {
                ne++
            }
        }
        //@ts-ignore
        cost[a][b] = cost[b][a] = Infinity
    }
    return parents
}