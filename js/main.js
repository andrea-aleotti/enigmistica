let grid;
let difficult;

function setGrid(sel) {
    grid = sel;

    $("#grid-choose").addClass("hide");
    $("#difficult-choose").removeClass("hide");
}

function setDifficult(sel) {
    difficult = sel;

    $("#difficult-choose").addClass("hide");
    createSudoku();
}

function createSudoku() {

    let html = "";
    html += `<div class="board">`;
    for (let i = 0; i < (grid * grid); i++) {
        html += `<div class="cell" id="c${i}" onclick="javascript:selectingCell(this)"></div>`;
    }
    html += `</div>`;
    $("#sudoku_box_wrapper").append(html);

    addNumbers(difficult);

    $("#main").removeClass("hide");
}

function addNumbers(difficulty) {
    // Define the number of initial numbers based on difficulty
    let fillCount;
    switch (difficulty) {
        case 'easy':
            fillCount = 30; // Approximate number of filled cells for an easy Sudoku
            break;
        case 'medium':
            fillCount = 20; // Approximate number of filled cells for a medium Sudoku
            break;
        case 'difficult':
            fillCount = 10; // Approximate number of filled cells for a difficult Sudoku
            break;
        default:
            fillCount = 25; // Default to medium difficulty
            break;
    }

    // Get all cells
    const cells = document.querySelectorAll('.cell');

    // Generate a valid Sudoku puzzle
    generateSudoku(cells);

    // Remove numbers to achieve the desired difficulty level
    removeNumbers(cells, fillCount);
}

function generateSudoku(cells) {
    const board = new Array(9).fill(null).map(() => new Array(9).fill(0));
    solveSudoku(board);
    // Fill cells with the generated Sudoku puzzle
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = cells[row * 9 + col];
            cell.innerText = board[row][col];
        }
    }
}

function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        // All cells are filled, puzzle is solved
        return true;
    }
    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            // Backtrack
            board[row][col] = 0;
        }
    }
    return false;
}

function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValidMove(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function removeNumbers(cells, fillCount) {
    const indices = Array.from({ length: 81 }, (_, index) => index);
    for (let i = 0; i < 81 - fillCount; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        const index = indices[randomIndex];
        const cell = cells[index];
        cell.innerText = '';
        indices.splice(randomIndex, 1);
    }
}

function selectingCell(el) {

    if ($(".cell_selected")){

        if ($(".cell_selected").attr("id") == $(el).attr("id")) {

            $(".cell_selected").removeClass("cell_selected");
            $("#selected_cell span").text(`Nessuna cella selezionata`);
            return;
        }
        
        $(".cell_selected").removeClass("cell_selected");
    }

    $(el).addClass("cell_selected");
    $("#selected_cell").attr("data-cell", $(el).attr("id"));
    $("#selected_cell span").text(`Cella selezionata: ${$(el).attr("id")}`);
}