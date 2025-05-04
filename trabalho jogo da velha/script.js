let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameOver = false;

function makeMove(row, col) {
    if (board[row][col] === '' && !gameOver) {
        board[row][col] = currentPlayer;
        document.querySelectorAll('.cell')[row * 3 + col].textContent = currentPlayer;

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

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');

    document.getElementById('current-player').textContent = 'Vez de: X';
}

function botMove() {
    let move = findBestMove('O'); // tenta ganhar
    if (!move) move = findBestMove('X'); // tenta bloquear
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
                if (checkWinner()) {
                    board[i][j] = '';
                    return { row: i, col: j };
                }
                board[i][j] = '';
            }
        }
    }
    return null;
}

// Navegação por teclado
function handleKey(event, row, col) {
    const index = row * 3 + col;
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
    const index = row * 3 + col;
    document.querySelectorAll('.cell')[index].focus();
}
