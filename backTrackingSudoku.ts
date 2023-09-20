const solveSudoku = (sudukoTable: number[][]) => {
    const emptyCell = findEmptyCell(sudukoTable);
    if(!emptyCell){
        return true;
    }

    const [row, col] = emptyCell;

    for(let num = 1; num <= 9; num++){
        if(isValid(sudukoTable, row, col, num)){
            sudukoTable[row][col] = num;
            if(solveSudoku(sudukoTable)){
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

const sudokuBoard = [
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



// const solvedSuduko = solveSudoku(sudokuBoard);
// console.log(solvedSuduko)

export const generateSudoku = () => {
    // Erstelle eine leere 9x9-Matrix
    const sudoku = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Löse das Sudoku
    solveSudoku(sudoku);

    // Entferne einige Zahlen, um das Rätsel zu erstellen
    const difficulty = 30;  // Anzahl der Zahlen, die entfernt werden
    for (let i = 0; i < difficulty; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (sudoku[row][col] === 0);

        const backup = sudoku[row][col];
        sudoku[row][col] = 0;

        const tempSudoku = JSON.parse(JSON.stringify(sudoku));

        if (!solveSudoku(tempSudoku)) {
            sudoku[row][col] = backup;
        }
    }

    return sudoku;
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


// Beispielaufruf
const generatedSudoku = generateSudoku();
console.log("Generiertes Sudoku:");
printSudoku(generatedSudoku);
console.log('')
printSudoku(solveSudoku(generatedSudoku));