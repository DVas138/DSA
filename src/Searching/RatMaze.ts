function  ratMaze(maze:Array<Array<number>>) {
    const  solution:Array<Array<number>> = []
    for (let i = 0; i < maze.length; i++) {
        solution[i] = []
        for (let ii = 0; ii < maze[i].length; ii++) {
            solution[i][ii] = 0
        }
    }
    if (findPath(maze, 0,0, solution) === true) {
        return solution
    }
    return false
}

function findPath(maze:Array<Array<number>>, x:number, y: number, solution:Array<Array<number>>):boolean {
    const n = maze.length
    if (x === n - 1 && y === n - 1) {
        solution[x][y] = 1
        return true
    }
    if (isSafe(maze, x, y) === true) {
        solution[x][y] = 1
        if (findPath(maze, x + 1, y, solution)) {
            return  true
        }
        if (findPath(maze, x, y + 1, solution)) {
            return true
        }
        solution[x][y] = 0
        return false
    }
    return false
}

function isSafe(maze:Array<Array<number>>, x: number, y: number) {
    const n = maze.length
    return x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0;
}

const  maze = [
    [1,0,0,0],
    [1,1,1,1],
    [0,0,1,0],
    [0,0,1,1]
]
console.log(ratMaze(maze))