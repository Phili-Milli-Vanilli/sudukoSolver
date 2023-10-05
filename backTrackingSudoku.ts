import * as HelperFunctions from './helperFunctions'

const sudokuSolver = (sudukoTable: number[][]) => {
    const emptyCell = HelperFunctions.findEmptyCell(sudukoTable);
    if(!emptyCell){
        return true;
    }

    const [row, col] = emptyCell;

    for(let num = 1; num <= 9; num++){
        if(HelperFunctions.isValid(sudukoTable, row, col, num)){
            sudukoTable[row][col] = num;
            if(sudokuSolver(sudukoTable)){
                return sudukoTable;
            }
            sudukoTable[row][col] = 0;
        }
    }
    return;
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

let timeUsed = 0; 

for(let i=0; i<100; i++){
    const generated = HelperFunctions.generateSudoku()

    const startTime = process.hrtime();
    const solvedSudoku = sudokuSolver(generated);
    const endTime = process.hrtime(startTime);
    const executionTimeInMs = (endTime[0] * 1e9 + endTime[1]) / 1e6;
    timeUsed += executionTimeInMs / 100;
    
}
console.log(timeUsed)

// const generated = HelperFunctions.generateSudoku()

// console.log('///Anfang Backtracking///')

// HelperFunctions.printSudoku(generated)

// console.log('----------------------')
// console.log('----------------------')

// const startTime = process.hrtime();
// //Start Process
// const solvedSudoku = sudokuSolver(generated)

// const endTime = process.hrtime(startTime);
// const executionTimeInMs = (endTime[0] * 1e9 + endTime[1]) / 1e6;

// HelperFunctions.printSudoku(solvedSudoku)
// //Measurement
// console.log(`Execution time: ${executionTimeInMs} ms`);
// console.log('///Ende Backtracking///')