// ==========================================
// CONNECT FOUR AI
// HTML + CSS + JavaScript
// Minimax + Alpha-Beta Pruning
// ==========================================


// ==========================================
// GAME CONSTANTS
// ==========================================

const ROWS = 6;
const COLS = 7;

const EMPTY = 0;
const PLAYER = 1;
const AI = 2;


// ==========================================
// GAME VARIABLES
// ==========================================

let board = [];

let gameOver = false;

let playerTurn = true;

let playerScore = 0;
let aiScore = 0;

let searchDepth = 4;


// ==========================================
// DOM ELEMENTS
// ==========================================

const boardElement =
    document.getElementById("board");

const statusElement =
    document.getElementById("status");

const playerScoreElement =
    document.getElementById("playerScore");

const aiScoreElement =
    document.getElementById("aiScore");

const newGameButton =
    document.getElementById("newGameBtn");

const resetScoreButton =
    document.getElementById("resetScoreBtn");

const difficultyElement =
    document.getElementById("difficulty");


// ==========================================
// START GAME
// ==========================================

function startGame() {

    board = createEmptyBoard();

    gameOver = false;

    playerTurn = true;

    updateStatus("Your Turn");

    renderBoard();

    newGameButton.disabled = false;
}


// ==========================================
// CREATE EMPTY BOARD
// ==========================================

function createEmptyBoard() {

    const newBoard = [];

    for (let row = 0; row < ROWS; row++) {

        newBoard[row] = [];

        for (let col = 0; col < COLS; col++) {

            newBoard[row][col] = EMPTY;
        }
    }

    return newBoard;
}


// ==========================================
// RENDER BOARD
// ==========================================

function renderBoard(winningCells = []) {

    boardElement.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {

            const cell = document.createElement("button");

            cell.classList.add("cell");

            cell.type = "button";

            cell.setAttribute(
                "aria-label",
                `Row ${row + 1}, Column ${col + 1}`
            );


            // Player piece
            if (board[row][col] === PLAYER) {

                cell.classList.add("player");
            }


            // AI piece
            if (board[row][col] === AI) {

                cell.classList.add("ai");
            }


            // Winning piece
            const isWinningCell =
                winningCells.some(
                    position =>
                        position.row === row &&
                        position.col === col
                );


            if (isWinningCell) {

                cell.classList.add("winning");
            }


            // Column click
            cell.addEventListener(
                "click",
                () => playerMove(col)
            );


            boardElement.appendChild(cell);
        }
    }
}


// ==========================================
// PLAYER MOVE
// ==========================================

function playerMove(col) {

    if (gameOver) {
        return;
    }

    if (!playerTurn) {
        return;
    }


    const row = getAvailableRow(board, col);


    // Column is full
    if (row === -1) {

        updateStatus("That column is full!");

        setTimeout(() => {

            if (!gameOver) {
                updateStatus("Your Turn");
            }

        }, 800);

        return;
    }


    // Place player piece
    board[row][col] = PLAYER;

    renderBoard();


    // Check player win
    const winningCells =
        findWinningCells(board, PLAYER);


    if (winningCells.length > 0) {

        playerScore++;

        updateScores();

        renderBoard(winningCells);

        gameOver = true;

        playerTurn = false;

        updateStatus("You Win! 🎉", "player-win");

        return;
    }


    // Check draw
    if (isBoardFull(board)) {

        gameOver = true;

        playerTurn = false;

        updateStatus("It's a Draw! 🤝");

        return;
    }


    // AI turn
    playerTurn = false;

    updateStatus(
        "AI is thinking...",
        "ai-thinking"
    );


    // Small delay so AI feels natural
    setTimeout(() => {

        aiMove();

    }, 450);
}


// ==========================================
// AI MOVE
// ==========================================

function aiMove() {

    if (gameOver) {
        return;
    }


    const bestColumn = getBestMove();


    if (bestColumn === -1) {

        gameOver = true;

        updateStatus("It's a Draw! 🤝");

        return;
    }


    const row =
        getAvailableRow(board, bestColumn);


    if (row === -1) {
        return;
    }


    // Place AI piece
    board[row][bestColumn] = AI;

    renderBoard();


    // Check AI win
    const winningCells =
        findWinningCells(board, AI);


    if (winningCells.length > 0) {

        aiScore++;

        updateScores();

        renderBoard(winningCells);

        gameOver = true;

        playerTurn = false;

        updateStatus(
            "AI Wins! 🤖",
            "ai-win"
        );

        return;
    }


    // Check draw
    if (isBoardFull(board)) {

        gameOver = true;

        playerTurn = false;

        updateStatus("It's a Draw! 🤝");

        return;
    }


    // Player's turn
    playerTurn = true;

    updateStatus("Your Turn");
}


// ==========================================
// GET AVAILABLE ROW
// ==========================================

function getAvailableRow(currentBoard, col) {

    for (
        let row = ROWS - 1;
        row >= 0;
        row--
    ) {

        if (
            currentBoard[row][col] === EMPTY
        ) {

            return row;
        }
    }

    return -1;
}


// ==========================================
// GET VALID COLUMNS
// ==========================================

function getValidColumns(currentBoard) {

    const validColumns = [];

    for (let col = 0; col < COLS; col++) {

        if (
            currentBoard[0][col] === EMPTY
        ) {

            validColumns.push(col);
        }
    }

    return validColumns;
}


// ==========================================
// CHECK BOARD FULL
// ==========================================

function isBoardFull(currentBoard) {

    return getValidColumns(currentBoard).length === 0;
}


// ==========================================
// FIND WINNING CELLS
// ==========================================

function findWinningCells(
    currentBoard,
    player
) {

    const directions = [

        // Horizontal
        [0, 1],

        // Vertical
        [1, 0],

        // Diagonal down-right
        [1, 1],

        // Diagonal up-right
        [-1, 1]
    ];


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            if (
                currentBoard[row][col] !== player
            ) {
                continue;
            }


            for (const [dr, dc] of directions) {

                const cells = [
                    {
                        row,
                        col
                    }
                ];


                for (let i = 1; i < 4; i++) {

                    const newRow =
                        row + dr * i;

                    const newCol =
                        col + dc * i;


                    if (
                        newRow < 0 ||
                        newRow >= ROWS ||
                        newCol < 0 ||
                        newCol >= COLS
                    ) {

                        break;
                    }


                    if (
                        currentBoard[newRow][newCol] === player
                    ) {

                        cells.push({
                            row: newRow,
                            col: newCol
                        });

                    } else {

                        break;
                    }
                }


                if (cells.length === 4) {

                    return cells;
                }
            }
        }
    }


    return [];
}


// ==========================================
// CHECK WIN
// ==========================================

function checkWin(currentBoard, player) {

    return findWinningCells(
        currentBoard,
        player
    ).length > 0;
}


// ==========================================
// COPY BOARD
// ==========================================

function copyBoard(currentBoard) {

    return currentBoard.map(
        row => [...row]
    );
}


// ==========================================
// GET BEST MOVE
// ==========================================

function getBestMove() {

    const validColumns =
        getValidColumns(board);


    if (validColumns.length === 0) {

        return -1;
    }


    let bestScore = -Infinity;

    let bestColumn =
        validColumns[
            Math.floor(
                validColumns.length / 2
            )
        ];


    // Try center columns first
    const orderedColumns =
        orderColumns(validColumns);


    for (const col of orderedColumns) {

        const row =
            getAvailableRow(board, col);


        const newBoard =
            copyBoard(board);


        newBoard[row][col] = AI;


        // Immediate winning move
        if (checkWin(newBoard, AI)) {

            return col;
        }


        const score =
            minimax(
                newBoard,
                searchDepth - 1,
                false,
                -Infinity,
                Infinity
            );


        if (score > bestScore) {

            bestScore = score;

            bestColumn = col;
        }
    }


    return bestColumn;
}


// ==========================================
// ORDER COLUMNS
// CENTER FIRST
// ==========================================

function orderColumns(columns) {

    const center =
        Math.floor(COLS / 2);


    return [...columns].sort(
        (a, b) =>
            Math.abs(center - a) -
            Math.abs(center - b)
    );
}


// ==========================================
// MINIMAX
// ==========================================

function minimax(
    currentBoard,
    depth,
    maximizingPlayer,
    alpha,
    beta
) {

    const validColumns =
        getValidColumns(currentBoard);


    const aiWon =
        checkWin(currentBoard, AI);


    const playerWon =
        checkWin(currentBoard, PLAYER);


    // Terminal states
    if (aiWon) {

        return 1000000 + depth;
    }


    if (playerWon) {

        return -1000000 - depth;
    }


    if (
        depth === 0 ||
        validColumns.length === 0
    ) {

        return evaluateBoard(currentBoard);
    }


    const orderedColumns =
        orderColumns(validColumns);


    // ======================================
    // AI MAXIMIZING
    // ======================================

    if (maximizingPlayer) {

        let maxScore = -Infinity;


        for (const col of orderedColumns) {

            const row =
                getAvailableRow(
                    currentBoard,
                    col
                );


            const newBoard =
                copyBoard(currentBoard);


            newBoard[row][col] = AI;


            const score =
                minimax(
                    newBoard,
                    depth - 1,
                    false,
                    alpha,
                    beta
                );


            maxScore =
                Math.max(
                    maxScore,
                    score
                );


            alpha =
                Math.max(
                    alpha,
                    score
                );


            // Alpha-Beta pruning
            if (alpha >= beta) {

                break;
            }
        }


        return maxScore;
    }


    // ======================================
    // PLAYER MINIMIZING
    // ======================================

    else {

        let minScore = Infinity;


        for (const col of orderedColumns) {

            const row =
                getAvailableRow(
                    currentBoard,
                    col
                );


            const newBoard =
                copyBoard(currentBoard);


            newBoard[row][col] = PLAYER;


            const score =
                minimax(
                    newBoard,
                    depth - 1,
                    true,
                    alpha,
                    beta
                );


            minScore =
                Math.min(
                    minScore,
                    score
                );


            beta =
                Math.min(
                    beta,
                    score
                );


            // Alpha-Beta pruning
            if (alpha >= beta) {

                break;
            }
        }


        return minScore;
    }
}


// ==========================================
// EVALUATE BOARD
// ==========================================

function evaluateBoard(currentBoard) {

    let score = 0;


    // --------------------------------------
    // Center column preference
    // --------------------------------------

    const centerColumn =
        Math.floor(COLS / 2);


    let aiCenterCount = 0;

    let playerCenterCount = 0;


    for (let row = 0; row < ROWS; row++) {

        if (
            currentBoard[row][centerColumn]
            === AI
        ) {

            aiCenterCount++;
        }


        if (
            currentBoard[row][centerColumn]
            === PLAYER
        ) {

            playerCenterCount++;
        }
    }


    score += aiCenterCount * 6;

    score -= playerCenterCount * 6;


    // --------------------------------------
    // Horizontal windows
    // --------------------------------------

    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS - 3;
            col++
        ) {

            const window = [

                currentBoard[row][col],

                currentBoard[row][col + 1],

                currentBoard[row][col + 2],

                currentBoard[row][col + 3]
            ];


            score += evaluateWindow(window);
        }
    }


    // --------------------------------------
    // Vertical windows
    // --------------------------------------

    for (
        let row = 0;
        row < ROWS - 3;
        row++
    ) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            const window = [

                currentBoard[row][col],

                currentBoard[row + 1][col],

                currentBoard[row + 2][col],

                currentBoard[row + 3][col]
            ];


            score += evaluateWindow(window);
        }
    }


    // --------------------------------------
    // Diagonal down-right
    // --------------------------------------

    for (
        let row = 0;
        row < ROWS - 3;
        row++
    ) {

        for (
            let col = 0;
            col < COLS - 3;
            col++
        ) {

            const window = [

                currentBoard[row][col],

                currentBoard[row + 1][col + 1],

                currentBoard[row + 2][col + 2],

                currentBoard[row + 3][col + 3]
            ];


            score += evaluateWindow(window);
        }
    }


    // --------------------------------------
    // Diagonal up-right
    // --------------------------------------

    for (
        let row = 3;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS - 3;
            col++
        ) {

            const window = [

                currentBoard[row][col],

                currentBoard[row - 1][col + 1],

                currentBoard[row - 2][col + 2],

                currentBoard[row - 3][col + 3]
            ];


            score += evaluateWindow(window);
        }
    }


    return score;
}


// ==========================================
// EVALUATE FOUR CELLS
// ==========================================

function evaluateWindow(window) {

    let score = 0;


    const aiCount =
        window.filter(
            value => value === AI
        ).length;


    const playerCount =
        window.filter(
            value => value === PLAYER
        ).length;


    const emptyCount =
        window.filter(
            value => value === EMPTY
        ).length;


    // AI has four
    if (aiCount === 4) {

        score += 100000;
    }


    // AI has three + empty
    else if (
        aiCount === 3 &&
        emptyCount === 1
    ) {

        score += 100;
    }


    // AI has two + two empty
    else if (
        aiCount === 2 &&
        emptyCount === 2
    ) {

        score += 15;
    }


    // Player has three + empty
    if (
        playerCount === 3 &&
        emptyCount === 1
    ) {

        score -= 120;
    }


    // Player has two + two empty
    else if (
        playerCount === 2 &&
        emptyCount === 2
    ) {

        score -= 15;
    }


    return score;
}


// ==========================================
// UPDATE STATUS
// ==========================================

function updateStatus(
    message,
    className = ""
) {

    statusElement.textContent = message;

    statusElement.className = "status";


    if (className) {

        statusElement.classList.add(
            className
        );
    }
}


// ==========================================
// UPDATE SCORES
// ==========================================

function updateScores() {

    playerScoreElement.textContent =
        playerScore;

    aiScoreElement.textContent =
        aiScore;
}


// ==========================================
// NEW GAME BUTTON
// ==========================================

newGameButton.addEventListener(
    "click",
    () => {

        startGame();
    }
);


// ==========================================
// RESET SCORE BUTTON
// ==========================================

resetScoreButton.addEventListener(
    "click",
    () => {

        playerScore = 0;

        aiScore = 0;

        updateScores();

        startGame();
    }
);


// ==========================================
// DIFFICULTY
// ==========================================

difficultyElement.addEventListener(
    "change",
    () => {

        searchDepth =
            Number(
                difficultyElement.value
            );

        startGame();
    }
);


// ==========================================
// INITIALIZE GAME
// ==========================================

searchDepth =
    Number(
        difficultyElement.value
    );


updateScores();

startGame();