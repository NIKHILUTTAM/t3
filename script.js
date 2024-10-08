const X_CLASS = 'x';
const O_CLASS = 'o';
const X_TEXT = 'X'; // Text for X
const O_TEXT = 'O'; // Text for O
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear cell content
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setMessage("X's turn");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    const currentText = circleTurn ? O_TEXT : X_TEXT;
    
    placeMark(cell, currentClass, currentText);
    
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setMessage(`${circleTurn ? "O's" : "X's"} turn`);
    }
}

function endGame(draw) {
    if (draw) {
        setMessage('Draw!');
    } else {
        setMessage(`${circleTurn ? "O" : "X"} Wins!`);
    }
}

function setMessage(message) {
    messageElement.textContent = message;
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass, currentText) {
    cell.classList.add(currentClass); // Add class for styling (optional)
    cell.textContent = currentText;   // Display X or O text in the cell
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
