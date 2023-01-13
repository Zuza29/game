// Global variables
const sides = 6;
const result = document.getElementById('result');
const rollBtn = document.getElementById('die-btn');
const board = document.getElementById('board');
const fieldBtn = document.getElementById('field-btn');
const player = document.getElementById('player');
player.style.display = 'none';
let playerPosition = 1;
let boardSize;
let fields = [];

// Roll the die
const roll = () => {
    const side = Math.floor(Math.random() * sides + 1);
    side === 1 ? result.innerText = `You move by ${side} step.` : result.innerText = `You move by ${side} steps.`;
    movePlayer(side)
}

const input = document.getElementById('input');

// Create the game board
const createBoard = (fieldNum) => {
    player.style.display = 'block'
    for (let i = 0; i < fieldNum; i++) {
    const field = document.createElement('div');
        field.classList.add('field');
        fields.push(field);
    }
    board.append(...fields);
    boardSize = fieldNum;
    rollBtn.addEventListener('click', roll);
}

//
fieldBtn.addEventListener('click', () => {
    let value = input.value;
    if (value.trim() === '') {
        return;
    }
    if (value < 5 || value > 50) {
        alert('Please enter a number between 5 and 50');
        return;
    }
    createBoard(value);
});

const setPlayerPosition = () => {
    const targetField = board.children[playerPosition];
    const topPosition = targetField.offsetTop;
    const leftPosition = targetField.offsetLeft;
    player.style.top = topPosition + 18 + 'px';
    player.style.left = leftPosition + 18 + 'px';
}

const getPrize = () => {
    result.innerText = 'You got to the end'
}

const movePlayer = (value) => {
    playerPosition = playerPosition + value;
    if (playerPosition > boardSize) {
        playerPosition = 1;
        console.log(1)
    }
    if (playerPosition === boardSize) {
        getPrize()
        console.log('last')
    }
    setPlayerPosition()
}


