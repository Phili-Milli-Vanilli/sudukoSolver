function isSudokuSolved(sudoku: number[][]) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudoku[row][col] === 0) {
                return false;  // Es gibt leere Felder
            }
            if (!isValid(sudoku, row, col, sudoku[row][col])) {
                return false;  // Eine Zahl verletzt die Sudoku-Regeln
            }
        }
    }
    return true;  // Sudoku ist gelöst
}

export const isValid = (sudukoTable: number[][], row: number, col: number, num: number) => {
    for(let i = 0; i < 9; i++){
        if(sudukoTable[row][i] === num){
            return false;
        }
    }

    for(let i = 0; i < 9; i++){
        if(sudukoTable[i][col] === num){
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for(let i = startRow; i < startRow + 3; i++){
        for(let j = startCol; j < startCol + 3; j++){
            if(sudukoTable[i][j] === num){
                return false;
            }
        }
    }
    return true;
}

export function printSudoku(sudoku: number[][] | undefined | true) {
    if(sudoku === undefined || sudoku === true){
        console.log('kein printbares Array')
        console.log(sudoku)
        return
    }
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) {
            console.log("- - - - - - - - - - -");
        }
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0 && j !== 0) {
                process.stdout.write("| ");
            }
            if (j === 8) {
                console.log(sudoku[i][j]);
            } else {
                process.stdout.write(sudoku[i][j] === 0 ? "  " : sudoku[i][j] + " ");
            }
        }
    }
}

function bruteForceSudoku(sudoku: number[][], row = 0, col = 0) {
    if (row === 9) {
        if (isSudokuSolved(sudoku)) {
            return true;  // Sudoku ist gelöst
        }
        console.log('1')
        return false;  // Sudoku ist nicht gelöst
    }

    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = (col + 1) % 9;

    if (sudoku[row][col] !== 0) {
        return bruteForceSudoku(sudoku, nextRow, nextCol);
    }

    for (let num = 1; num <= 9; num++) {
        if (isValid(sudoku, row, col, num)) {
            sudoku[row][col] = num;
            if (bruteForceSudoku(sudoku, nextRow, nextCol)) {
                return true;
            }
            sudoku[row][col] = 0;  // Backtrack
        }
    }

    return false;
}

// Beispielmodellierung eines 9x9-Sudoku als 2D-Array
const unsolvedSudoku = [
    [0, 0, 3, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 7, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const unsolvedSudoku2 = [
    [1, 6, 3, 8, 2, 5, 7, 0, 9],
    [9, 5, 8, 6, 7, 4, 0, 1, 3],
    [2, 0, 4, 3, 1, 9, 8, 5, 6],
    [4, 1, 7, 5, 0, 8, 0, 9, 2],
    [0, 8, 5, 2, 9, 3, 4, 7, 1],
    [3, 9, 2, 0, 7, 0, 5, 6, 8],
    [5, 0, 6, 9, 8, 7, 1, 3, 2],
    [8, 3, 1, 7, 4, 2, 9, 6, 5],
    [7, 2, 9, 1, 3, 6, 0, 8, 4]
]

bruteForceSudoku(unsolvedSudoku);

console.log("Gelöstes Sudoku:");
printSudoku(unsolvedSudoku)
