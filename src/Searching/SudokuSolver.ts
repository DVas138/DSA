function sudokuSolver(matrix: Array<Array<number>>):boolean | Array<Array<number>> {
    if (solvSudoku(matrix) == true) {
        return matrix
    }
    return  false
}

const UNASSIGNED = 0

function solvSudoku(matrix: Array<Array<number>>) {
    let row = 0;
    let col = 0
    let checkBlankSpace = false
    for (row = 0; row < matrix.length; row++) {
        for (col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === UNASSIGNED){
            checkBlankSpace = true
            break
            }
        }
        if (checkBlankSpace === true) {
            break
        }
    }
    if (checkBlankSpace == false) {
        return true
    }

    for (let num = 1; num <= 9; num++ ){
        if (isSafe(matrix, row, col, num)) {
            matrix[row][col] = num
            if (solvSudoku(matrix)) {
                return true
            }
            matrix[row][col] = UNASSIGNED
        }
    }
    return false
}

function isSafe(matrix: Array<Array<number>>, row: number, col: number, num: number) {
    return (
        !usedInRow(matrix, row,  num) &&
        !usedInCol(matrix, col, num) &&
        !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
    )
}

function usedInRow(matrix: Array<Array<number>>, row: number, num: number) {
    for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col] === num) {
            return true
        }
    }
    return false
}
function usedInCol(matrix: Array<Array<number>>, col: number, num: number) {
    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row][col] === num) {
            return true
        }
    }
    return false
}function usedInBox(matrix: Array<Array<number>>, Brow: number, Bcol: number, num: number) {
    for (let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if (matrix[row + Brow][col + Bcol] === num) {
                return true
            }
        }
    }
    return false
}

const sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
console.log(sudokuSolver(sudokuGrid));
