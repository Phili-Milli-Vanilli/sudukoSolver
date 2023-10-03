"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSudoku = exports.generateSudoku = exports.isValid = exports.findEmptyCell = exports.sudokuSolver = void 0;
var sudokuSolver = function (sudukoTable) {
    var emptyCell = (0, exports.findEmptyCell)(sudukoTable);
    if (!emptyCell) {
        return true;
    }
    var row = emptyCell[0], col = emptyCell[1];
    for (var num = 1; num <= 9; num++) {
        if ((0, exports.isValid)(sudukoTable, row, col, num)) {
            sudukoTable[row][col] = num;
            if ((0, exports.sudokuSolver)(sudukoTable)) {
                return sudukoTable;
            }
            sudukoTable[row][col] = 0;
        }
    }
    return;
};
exports.sudokuSolver = sudokuSolver;
var findEmptyCell = function (sudukoTable) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (sudukoTable[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
};
exports.findEmptyCell = findEmptyCell;
var isValid = function (sudukoTable, row, col, num) {
    for (var i = 0; i < 9; i++) {
        if (sudukoTable[row][i] === num) {
            return false;
        }
    }
    for (var i = 0; i < 9; i++) {
        if (sudukoTable[i][col] === num) {
            return false;
        }
    }
    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;
    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            if (sudukoTable[i][j] === num) {
                return false;
            }
        }
    }
    return true;
};
exports.isValid = isValid;
var generateSudoku = function () {
    // Erstelle eine leere 9x9-Matrix
    var sudoku = Array.from({ length: 9 }, function () { return Array(9).fill(0); });
    // Löse das Sudoku
    (0, exports.sudokuSolver)(sudoku);
    // Entferne einige Zahlen, um das Rätsel zu erstellen
    var difficulty = 1; // Anzahl der Zahlen, die entfernt werden
    for (var i = 0; i < difficulty; i++) {
        var row = void 0, col = void 0;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (sudoku[row][col] === 0);
        var backup = sudoku[row][col];
        sudoku[row][col] = 0;
        var tempSudoku = JSON.parse(JSON.stringify(sudoku));
        if (!(0, exports.sudokuSolver)(tempSudoku)) {
            sudoku[row][col] = backup;
        }
    }
    return sudoku;
};
exports.generateSudoku = generateSudoku;
var printSudoku = function (sudoku) {
    if (sudoku === undefined || sudoku === true) {
        console.log('kein printbares Array');
        console.log(sudoku);
        return;
    }
    for (var i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) {
            console.log("- - - - - - - - - - -");
        }
        for (var j = 0; j < 9; j++) {
            if (j % 3 === 0 && j !== 0) {
                process.stdout.write("| ");
            }
            if (j === 8) {
                console.log(sudoku[i][j]);
            }
            else {
                process.stdout.write(sudoku[i][j] === 0 ? "  " : sudoku[i][j] + " ");
            }
        }
    }
};
exports.printSudoku = printSudoku;
