// Global variables
const backgrounds = ['img/gameover.jpg', 'img/field1.jpg', 'img/field2.jpg', 'img/field3.jpg', 'img/field4.jpg', 'img/field5.jpg', 'img/field1.jpg', 'img/field2.jpg', 'img/field3.jpg', 'img/field4.jpg', 'img/field5.jpg'];
const victoryBackground = 'img/victory.jpg';

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const section = document.querySelector('section'),
    overlay = document.querySelector('.overlay'),
    showBtn = document.querySelector('.show-modal'),
    closeBtn = document.querySelector('.close-btn'),
    sides = 6,
    result = document.getElementById('result'),
    rollBtn = document.getElementById('die-btn'),
    board = document.getElementById('board'),
    fieldBtn = document.getElementById('field-btn'),
    elDiceOne = document.getElementById('dice1'),
    resetBtn = document.getElementById('reset-btn'),
    pawn = [...document.getElementsByClassName('pawn')][0],
    endHeading = [...document.getElementsByClassName('end-heading')][0],
    endImg = [...document.getElementsByClassName('end-img')][0],
    tryAgainBtn = document.getElementById('try-again-btn'),
    hidden = [...document.getElementsByClassName('backdrop')][0],
endText = document.getElementById('end-text');

let playerPosition = 0;
let boardSize;
let fields = [];
let player = pawn;
rollBtn.classList.add('btn-disabled');
pawn.style.display = 'none';

tryAgainBtn.addEventListener('click', () => {
    hidden.classList.add('is-hidden');
    reset();
});   

const victory = () => {
    hidden.classList.toggle('is-hidden');
    endHeading.innerText = 'Victory!';
    endImg.src = 'img/treasure.gif';
    endImg.classList.remove('mushrooms');
    endImg.classList.add('treasure');
    endText.innerText = 'You found the treasure! Congratulations!';
    
}

const gameOver = () => {
    hidden.classList.toggle('is-hidden');
    endHeading.innerText = 'Game Over!';
    endText.innerText = 'You took a wrong turn and stepped into the dark forest...';
    endImg.src = 'img/mushrooms.gif';
    endImg.classList.remove('treasure');
    endImg.classList.add('mushrooms');

    }

const gameOverFields = [];

const generateBackground = (array, fieldToPaint, fieldNumber) => {
    const imgSrc = backgrounds[Math.floor(Math.random() * array.length)];
    if (fieldNumber == boardSize) {
        fieldToPaint.style.backgroundImage = `url(${victoryBackground})`;
    } else {
        fieldToPaint.style.backgroundImage = `url(${imgSrc})`;
        if (imgSrc === 'img/gameover.jpg') {
            gameOverFields.push(fieldToPaint.id * 1);
        }
    }
    fieldToPaint.style.backgroundSize = 'cover';
    fieldToPaint.style.backgroundRepeat = 'no-repeat';
}

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
    };
}

const input = document.getElementById('input');
fieldBtn.classList.toggle('blink')

// Create the game board
const createBoard = (fieldNum) => {

    boardSize = fieldNum;
    player.classList.add('player');
    for (let i = 1; i <= fieldNum; i++) {
        const field = document.createElement('div');
        const fieldNumberText = document.createElement('span');
        fieldNumberText.classList.add('fieldNumberText')
        field.classList.add('field');
        field.setAttribute('id', i)
        fieldNumberText.innerText = i;
        generateBackground(backgrounds, field, i);
        field.appendChild(fieldNumberText);
        fields.push(field);
    }
    board.append(...fields);
    board.appendChild(player)
    rollBtn.addEventListener('click', roll);
    rollBtn.classList.toggle('btn-disabled');
    fieldBtn.classList.toggle('blink');
    fieldBtn.classList.toggle('btn-disabled')
    rollBtn.classList.toggle('blink');
    pawn.style.display = 'block';
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
    player.style.top = topPosition + 70 + 'px';
    player.style.left = leftPosition + 70 + 'px';
}

const movePlayer = (value) => {
    playerPosition += value;
    if (playerPosition >= boardSize) {
        result.innerText = 'You went too far... Try again!';
        playerPosition = 0;
    };
    if (gameOverFields.includes(playerPosition + 1)) {
        setTimeout(gameOver, 2000)
    };
    if (playerPosition + 1 == boardSize) {
        setTimeout(victory, 2000);
        rollBtn.classList.toggle('blink');
    };
    setPlayerPosition();
};


const reset = () => {
    window.location.reload();
    document.documentElement.scrollTop = 0;

};

resetBtn.addEventListener('click', reset)



