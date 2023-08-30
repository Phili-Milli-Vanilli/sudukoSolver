import { isValid, printSudoku } from "./backTrackingSudoku";


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

function bruteForceSudoku(sudoku: number[][], row = 0, col = 0) {
    if (row === 9) {
        if (isSudokuSolved(sudoku)) {
            return true;  // Sudoku ist gelöst
        }
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

bruteForceSudoku(unsolvedSudoku);

console.log("Gelöstes Sudoku:");
printSudoku(unsolvedSudoku)
