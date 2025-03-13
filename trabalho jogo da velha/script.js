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
            alert(currentPlayer + ' venceu!');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return true;
    }
    return false;
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
}
