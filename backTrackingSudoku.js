const solveSuduko = function (sudukoTable) {
    var emptyCell = findEmptyCell(sudukoTable);
    if (!emptyCell) {
        return true;
    }
    var row = emptyCell[0], col = emptyCell[1];
    for (var num = 1; num <= 9; num++) {
        if (isValid(sudukoTable, row, col, num)) {
            sudukoTable[row][col] = num;
            if (solveSuduko(sudukoTable)) {
                return console.log(true);
            }
            sudukoTable[row][col] = 0;
        }
    }
    return false;
};
const findEmptyCell = function (sudukoTable) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (sudukoTable[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
};
const isValid = function (sudukoTable, row, col, num) {
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
    return false;
};
const sudokuBoard = [
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
solveSuduko(sudokuBoard);
