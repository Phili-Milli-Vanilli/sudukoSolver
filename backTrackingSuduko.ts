const solveSuduko = (sudukoTable: number[][]) => {
    const emptyCell = findEmptyCell(sudukoTable);
    if(!emptyCell){
        console.log('Suduko Gut!')
        return true;
    }

    const [row, col] = emptyCell;

    for(let num = 1; num <= 9; num++){
        if(isValid(sudukoTable, row, col, num)){
            sudukoTable[row][col] = num;
            if(solveSuduko(sudukoTable)){
                return sudukoTable;
            }
            sudukoTable[row][col] = 0;
        }
    }
    return;
} 

const findEmptyCell = (sudukoTable: number[][]) => {
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(sudukoTable[row][col] === 0){
                return [row, col];
            }
        }
    }
    return null;
}

const isValid = (sudukoTable: number[][], row: number, col: number, num: number) => {
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

const unsolvableSudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 7]  // Beachte die ungültige 7 in dieser Zeile
];

const solvedSuduko = solveSuduko(sudokuBoard);
console.log(solvedSuduko)