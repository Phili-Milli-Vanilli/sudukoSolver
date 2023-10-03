"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HelperFunctions = require("./helperFunctions");
function bruteForceSudoku(sudoku, row, col) {
    if (row === void 0) { row = 0; }
    if (col === void 0) { col = 0; }
    if (row === 9) {
        return true; // Sudoku ist gelöst
    }
    var nextRow = col === 8 ? row + 1 : row;
    var nextCol = (col + 1) % 9;
    if (sudoku[row][col] !== 0) {
        return bruteForceSudoku(sudoku, nextRow, nextCol);
    }
    for (var num = 1; num <= 9; num++) {
        if (HelperFunctions.isValid(sudoku, row, col, num)) {
            sudoku[row][col] = num;
            if (bruteForceSudoku(sudoku, nextRow, nextCol)) {
                return true;
            }
            sudoku[row][col] = 0; // Backtrack
        }
    }
    return false;
}
function solveSudoku(sudoku) {
    var solvedSudoku = JSON.parse(JSON.stringify(sudoku)); // Eine Kopie des ursprünglichen Sudoku-Gitters
    if (bruteForceSudoku(solvedSudoku)) {
        return solvedSudoku;
    }
    else {
        return null;
    }
}
// Beispielmodellierung eines 9x9-Sudoku als 2D-Array
var unsolvableSudoku = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7],
    [3, 6, 5, 8, 9, 7, 2, 1, 4],
    [8, 9, 7, 2, 1, 4, 3, 6, 5],
    [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 0, 3, 1],
    [9, 7, 8, 5, 3, 1, 6, 4, 2] // Beachte die ungültige 7 in dieser Zeile
];
var unsolvedSudoku2 = [
    [1, 6, 3, 8, 2, 5, 7, 0, 9],
    [9, 5, 8, 6, 7, 4, 0, 1, 3],
    [2, 0, 4, 3, 1, 9, 8, 5, 6],
    [4, 1, 7, 5, 0, 8, 0, 9, 2],
    [0, 8, 5, 2, 9, 3, 4, 7, 1],
    [3, 9, 2, 0, 7, 0, 5, 6, 8],
    [5, 0, 6, 9, 8, 7, 1, 3, 2],
    [8, 3, 1, 7, 4, 2, 9, 6, 5],
    [7, 2, 9, 1, 3, 6, 0, 8, 4]
];
var generated = HelperFunctions.generateSudoku();
var startTime = process.hrtime();
var solvedSudoku = solveSudoku(generated);
var endTime = process.hrtime(startTime);
var executionTimeInMs = (endTime[0] * 1e9 + endTime[1]) / 1e6;
console.log('///Anfang BruteForce///');
console.log('Ungelöste Sudoku');
HelperFunctions.printSudoku(generated);
console.log('----------------------');
console.log('----------------------');
if (solvedSudoku) {
    console.log("Das Sudoku wurde gelöst.");
    HelperFunctions.printSudoku(solvedSudoku);
}
else {
    console.log("Das Sudoku konnte nicht gelöst werden.");
}
//Measurement
console.log("Execution time: ".concat(executionTimeInMs, " ms"));
console.log('///Ende BruteForce///');
