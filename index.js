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

