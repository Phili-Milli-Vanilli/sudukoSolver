export const sudokuSolver = (sudukoTable: number[][]) => {
    const emptyCell = findEmptyCell(sudukoTable);
    if(!emptyCell){
        return true;
    }

    const [row, col] = emptyCell;

    for(let num = 1; num <= 9; num++){
        if(isValid(sudukoTable, row, col, num)){
            sudukoTable[row][col] = num;
            if(sudokuSolver(sudukoTable)){
                return sudukoTable;
            }
            sudukoTable[row][col] = 0;
        }
    }
    return;
} 

export const isSudokuSolved = (sudoku: number[][]): boolean => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === 0) {
                return false; // Es gibt leere Zellen, das Sudoku ist nicht gelöst
            }
            if (!isValid(sudoku, i, j, sudoku[i][j])) {
                return false; // Eine Zahl verletzt die Sudoku-Regeln
            }
        }
    }
    return true; // Sudoku ist gelöst
}

export const findEmptyCell = (sudukoTable: number[][]) => {
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

export const generateSudoku = () => {
    // Erstelle eine leere 9x9-Matrix
    const sudoku = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Löse das Sudoku
    sudokuSolver(sudoku);

    // Entferne einige Zahlen, um das Rätsel zu erstellen
    const difficulty = 80;  // Anzahl der Zahlen, die entfernt werden
    for (let i = 0; i < difficulty; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (sudoku[row][col] === 0);

        const backup = sudoku[row][col];
        sudoku[row][col] = 0;

        const tempSudoku = JSON.parse(JSON.stringify(sudoku));

        if (!sudokuSolver(tempSudoku)) {
            sudoku[row][col] = backup;
        }
    }

    return sudoku;
}

export const printSudoku = (sudoku: number[][] | undefined | true) => {
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