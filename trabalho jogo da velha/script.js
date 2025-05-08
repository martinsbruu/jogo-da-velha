let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameOver = false;

// Inicializa os eventos ao carregar
window.onload = () => {
    document.querySelectorAll('.cell').forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        cell.addEventListener('click', () => makeMove(row, col));
        cell.addEventListener('keydown', (event) => handleKey(event, row, col));
    });
};

// Função chamada ao clicar (ou pressionar Enter/Espaço) em uma célula
function makeMove(row, col) {
    if (board[row][col] === '' && !gameOver) {
        board[row][col] = currentPlayer;

        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) {
            document.getElementById('current-player').textContent = currentPlayer + ' venceu!';
            gameOver = true;
            return;
        } else if (isBoardFull()) {
            document.getElementById('current-player').textContent = 'Empate!';
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('current-player').textContent = 'Vez de: ' + currentPlayer;

        const mode = document.getElementById('mode').value;
        if (mode === '1' && currentPlayer === 'O') {
            setTimeout(botMove, 500);
        }
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true;
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;
    return false;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== ''));
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    document.getElementById('current-player').textContent = 'Vez de: X';
}

function botMove() {
    let move = findBestMove('O');
    if (!move) move = findBestMove('X');
    if (!move) {
        const empty = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') empty.push({ row: i, col: j });
            }
        }
        if (empty.length > 0) {
            move = empty[Math.floor(Math.random() * empty.length)];
        }
    }
    if (move) makeMove(move.row, move.col);
}

function findBestMove(player) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = player;
                const isWinning = checkWinner();
                board[i][j] = '';
                if (isWinning) return { row: i, col: j };
            }
        }
    }
    return null;
}

// Captura teclas pressionadas em uma célula (setas, enter, espaço)
function handleKey(event, row, col) {
    switch (event.key) {
        case 'Enter':
        case ' ':
            makeMove(row, col);
            break;
        case 'ArrowUp':
            if (row > 0) focusCell(row - 1, col);
            break;
        case 'ArrowDown':
            if (row < 2) focusCell(row + 1, col);
            break;
        case 'ArrowLeft':
            if (col > 0) focusCell(row, col - 1);
            break;
        case 'ArrowRight':
            if (col < 2) focusCell(row, col + 1);
            break;
    }
}

function focusCell(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (cell) cell.focus();
}
