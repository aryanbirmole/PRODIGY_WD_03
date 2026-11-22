const boardElement = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusBanner = document.getElementById("statusBanner");
const restartBtn = document.getElementById("restartBtn");
const resetScoresBtn = document.getElementById("resetScoresBtn");
const pvpBtn = document.getElementById("pvpBtn");
const aiBtn = document.getElementById("aiBtn");
const playerOTag = document.getElementById("playerOTag");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreTiesElement = document.getElementById("scoreTies");
const scoreTotalElement = document.getElementById("scoreTotal");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let gameMode = "pvp";
let isAiThinking = false;
let autoRestartInterval = null;

const scores = {
    X: 0,
    O: 0,
    ties: 0
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function clearAutoRestart() {
    if (autoRestartInterval) {
        clearInterval(autoRestartInterval);
        autoRestartInterval = null;
    }
}

function startAutoRestartTimer(outcomeMessage) {
    clearAutoRestart();
    let timeLeft = 5;
    statusBanner.textContent = `${outcomeMessage} (Restarting in ${timeLeft}s)`;

    autoRestartInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            statusBanner.textContent = `${outcomeMessage} (Restarting in ${timeLeft}s)`;
        } else {
            clearAutoRestart();
            restartGame();
        }
    }, 1000);
}

function updateStatusText() {
    statusBanner.className = "status-banner";
    if (gameMode === "ai" && currentPlayer === "O") {
        statusBanner.textContent = "Computer is thinking...";
    } else {
        const playerLabel = (gameMode === "ai" && currentPlayer === "O") ? "Computer" : `Player ${currentPlayer}`;
        statusBanner.textContent = `${playerLabel}'s Turn`;
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-index"), 10);

    if (board[cellIndex] !== "" || !isGameActive || isAiThinking) {
        return;
    }

    makeMove(cellIndex, currentPlayer);

    const winningInfo = checkWinner(board);

    if (winningInfo) {
        endGame(winningInfo);
        return;
    }

    if (checkTie(board)) {
        endGameTie();
        return;
    }

    switchPlayer();

    if (gameMode === "ai" && currentPlayer === "O" && isGameActive) {
        isAiThinking = true;
        updateStatusText();
        setTimeout(makeAiMove, 300);
    }
}

function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusText();
}

function checkWinner(currentBoard) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return {
                winner: currentBoard[a],
                combination: combination
            };
        }
    }
    return null;
}

function checkTie(currentBoard) {
    return currentBoard.every(cell => cell !== "");
}

function endGame(winningInfo) {
    isGameActive = false;
    const winner = winningInfo.winner;

    for (const index of winningInfo.combination) {
        cells[index].classList.add("winning-cell");
    }

    statusBanner.className = `status-banner win-${winner.toLowerCase()}`;
    const winnerName = (gameMode === "ai" && winner === "O") ? "Computer" : `Player ${winner}`;
    const resultMessage = `${winnerName} Wins!`;

    scores[winner]++;
    updateScoreboard();
    startAutoRestartTimer(resultMessage);
}

function endGameTie() {
    isGameActive = false;
    statusBanner.className = "status-banner tie";
    const resultMessage = "Game Ended in a Draw!";

    scores.ties++;
    updateScoreboard();
    startAutoRestartTimer(resultMessage);
}

function updateScoreboard() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
    scoreTiesElement.textContent = scores.ties;
    scoreTotalElement.textContent = scores.X + scores.O + scores.ties;
}

function findAiMove() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const line = [board[a], board[b], board[c]];
        if (line.filter(val => val === "O").length === 2 && line.filter(val => val === "").length === 1) {
            return combination[line.indexOf("")];
        }
    }

    if (Math.random() < 0.65) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const line = [board[a], board[b], board[c]];
            if (line.filter(val => val === "X").length === 2 && line.filter(val => val === "").length === 1) {
                return combination[line.indexOf("")];
            }
        }
    }

    if (board[4] === "" && Math.random() < 0.55) {
        return 4;
    }

    const corners = [0, 2, 6, 8].filter(index => board[index] === "");
    if (corners.length > 0 && Math.random() < 0.55) {
        return corners[Math.floor(Math.random() * corners.length)];
    }

    const availableIndices = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            availableIndices.push(i);
        }
    }

    if (availableIndices.length > 0) {
        return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }

    return -1;
}

function makeAiMove() {
    if (!isGameActive) {
        isAiThinking = false;
        return;
    }

    const aiIndex = findAiMove();
    if (aiIndex !== -1) {
        makeMove(aiIndex, "O");
        const winningInfo = checkWinner(board);

        if (winningInfo) {
            endGame(winningInfo);
        } else if (checkTie(board)) {
            endGameTie();
        } else {
            currentPlayer = "X";
            updateStatusText();
        }
    }
    isAiThinking = false;
}

function restartGame() {
    clearAutoRestart();
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    isAiThinking = false;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });

    updateStatusText();
}

function resetScores() {
    clearAutoRestart();
    scores.X = 0;
    scores.O = 0;
    scores.ties = 0;
    updateScoreboard();
    restartGame();
}

function switchMode(newMode) {
    if (gameMode === newMode) return;
    clearAutoRestart();
    gameMode = newMode;

    if (gameMode === "pvp") {
        pvpBtn.classList.add("active");
        aiBtn.classList.remove("active");
        playerOTag.textContent = "Player O";
    } else {
        aiBtn.classList.add("active");
        pvpBtn.classList.remove("active");
        playerOTag.textContent = "Computer";
    }

    resetScores();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
resetScoresBtn.addEventListener("click", resetScores);
pvpBtn.addEventListener("click", () => switchMode("pvp"));
aiBtn.addEventListener("click", () => switchMode("ai"));

updateStatusText();
updateScoreboard();
