import * as HelperFunctions from './helperFunctions'


const bruteForceSudoku = (sudoku: number[][], row = 0, col = 0): boolean => {
    if (row === 9) {
        return true;
    }

    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = (col + 1) % 9;

    if (sudoku[row][col] !== 0) {
        return bruteForceSudoku(sudoku, nextRow, nextCol);
    }

    for (let num = 1; num <= 9; num++) {
        if (HelperFunctions.isValid(sudoku, row, col, num)) {
            sudoku[row][col] = num;
            if (bruteForceSudoku(sudoku, nextRow, nextCol)) {
                return true;
            }
            sudoku[row][col] = 0;
        }
    }

    return false;
}

const solveSudoku = (sudoku: number[][]) => {
    let solvedSudoku = JSON.parse(JSON.stringify(sudoku)); // Eine Kopie des ursprünglichen Sudoku-Gitters

    if (bruteForceSudoku(solvedSudoku)) {
        return solvedSudoku;
    } else {
        return null;
    }
}

// Beispielmodellierung eines 9x9-Sudoku als 2D-Array
const unsolvableSudoku = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7],
    [3, 6, 5, 8, 9, 7, 2, 1, 4],
    [8, 9, 7, 2, 1, 4, 3, 6, 5],
    [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 0, 3, 1],
    [9, 7, 8, 5, 3, 1, 6, 4, 2]  // Beachte die ungültige 7 in dieser Zeile
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

let timeUsed = 0;

for(let i=0; i<100; i++){
    const generated = HelperFunctions.generateSudoku()
    const startTime = process.hrtime();
    const solvedSudoku = solveSudoku(generated);
    const endTime = process.hrtime(startTime);
    const executionTimeInMs = (endTime[0] * 1e9 + endTime[1]) / 1e6;
    timeUsed += executionTimeInMs / 100;
    
}
console.log(timeUsed)

// console.log('///Anfang BruteForce///')

// console.log('Ungelöste Sudoku')
// HelperFunctions.printSudoku(generated)
// console.log('----------------------')
// console.log('----------------------')
// if (solvedSudoku) {
//     console.log("Das Sudoku wurde gelöst.")
//     HelperFunctions.printSudoku(solvedSudoku);
// } else {
//     console.log("Das Sudoku konnte nicht gelöst werden.");
// }
// //Measurement
// console.log(`Execution time: ${executionTimeInMs} ms`);
// console.log('///Ende BruteForce///')
