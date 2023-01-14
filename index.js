// Global variables
import { backgrounds } from "./backgrounds";
const sides = 6;
const result = document.getElementById('result');
const rollBtn = document.getElementById('die-btn');
const board = document.getElementById('board');
const fieldBtn = document.getElementById('field-btn');
const elDiceOne = document.getElementById('dice1');
const resetBtn = document.getElementById('reset-btn');
let playerPosition = 1;
let boardSize;
let fields = [];
let player;
rollBtn.classList.add('btn-disabled');

// Roll the die
const roll = () => {
    const side = Math.floor(Math.random() * sides + 1);
    side === 1 ? result.innerText = `You move by ${side} step. Roll again.` : result.innerText = `You move by ${side} steps. Roll again.`;
    movePlayer(side);
    board.style.marginTop = 12 + 'px';
    for (let i = 1; i <= sides; i++) {
        elDiceOne.classList.remove('show-' + i);
        if (side === i) {
            elDiceOne.classList.add('show-' + i);
        }
    }
}

const input = document.getElementById('input');
fieldBtn.classList.toggle('blink')

// Create the game board
const createBoard = (fieldNum) => {
 player = document.createElement('div');
    player.classList.add('player');
    for (let i = 1; i <= fieldNum; i++) {
        const field = document.createElement('div');
        const fieldNumberText = document.createElement('span');
        fieldNumberText.classList.add('fieldNumberText')
        field.classList.add('field');
        fieldNumberText.innerText = i;
        field.appendChild(fieldNumberText);
        fields.push(field);
    }
    board.append(...fields);
    boardSize = fieldNum;
    board.appendChild(player)
    rollBtn.addEventListener('click', roll);
    rollBtn.classList.toggle('btn-disabled');
    fieldBtn.classList.toggle('blink');
    fieldBtn.classList.toggle('btn-disabled')
    rollBtn.classList.toggle('blink');
}

//
fieldBtn.addEventListener('click', () => {
    let value = input.value;
    if (value < 5 || value > 50 || isNaN(value)) {
        alert('Please enter a number between 5 and 50');
        return;
    }
    createBoard(value);
});

const setPlayerPosition = () => {
    const targetField = board.children[playerPosition];
    const topPosition = targetField.offsetTop;
    const leftPosition = targetField.offsetLeft;
    player.style.top = topPosition + 36 + 'px';
    player.style.left = leftPosition + 36 + 'px';
}

const getPrize = () => {
    result.innerText = 'You got to the end'
}

const movePlayer = (value) => {
    playerPosition = playerPosition + value;
    if (playerPosition > boardSize) {
        playerPosition = 1;
        result.innerText = 'You went too far... Try again!'
    }
    if (playerPosition == boardSize) {
        getPrize();
        rollBtn.classList.toggle('blink');
    }
    setPlayerPosition()
};

const reset = () => {
    fieldBtn.classList.remove('btn-disabled');
    fieldBtn.classList.add('blink');
    rollBtn.classList.add('btn-disabled');
    rollBtn.classList.remove('blink');
    playerPosition = 1;
    board.innerHTML = '';
    result.innerHTML = '';
    input.value = '';
    document.documentElement.scrollTop = 0;
};

resetBtn.addEventListener('click', reset)



