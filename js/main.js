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

    // Create an array to hold the numbers already added to each group
    const rows = new Array(9).fill(null).map(() => new Set());
    const columns = new Array(9).fill(null).map(() => new Set());
    const boxes = new Array(9).fill(null).map(() => new Set());

    // Fill cells with valid numbers
    let filledCount = 0;
    while (filledCount < fillCount) {
        const randomIndex = Math.floor(Math.random() * cells.length);
        const cell = cells[randomIndex];
        const row = Math.floor(randomIndex / 9);
        const column = randomIndex % 9;
        const box = Math.floor(row / 3) * 3 + Math.floor(column / 3);
        
        // Generate a random number between 1 and 9
        const randomNumber = Math.floor(Math.random() * 9) + 1;

        // Check if the generated number is valid
        if (!rows[row].has(randomNumber) && !columns[column].has(randomNumber) && !boxes[box].has(randomNumber)) {
            // The number is not already used in the row, column, or box
            rows[row].add(randomNumber);
            columns[column].add(randomNumber);
            boxes[box].add(randomNumber);
            cell.innerText = randomNumber;
            filledCount++;
        }
    }
}

function selectingCell(el) {

    if ($(".cell_selected")){

        if ($(".cell_selected").attr("id") == $(el).attr("id")) {

            $(".cell_selected").removeClass("cell_selected");
            $("#selected_cell span").text(`Nessuna cella selezionata`);
            $("#canvas_box_container").addClass("hide");
            return;
        }
        
        $(".cell_selected").removeClass("cell_selected");
    }

    $(el).addClass("cell_selected");
    $("#selected_cell").attr("data-cell", $(el).attr("id"));
    $("#selected_cell span").text(`Cella selezionata: ${$(el).attr("id")}`);
    $("#canvas_box_container").removeClass("hide");
}