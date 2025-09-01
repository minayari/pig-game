'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

const currentElement0 = document.querySelector('#current--0');
const currentElement1 = document.querySelector('#current--1');
const totalElement0 = document.querySelector('#score--0');
const totalElement1 = document.querySelector('#score--1');

let current0 = 0;
let current1 = 0;
let total0 = JSON.parse(localStorage.getItem('total0')) || 0;
let total1 = JSON.parse(localStorage.getItem('total1')) || 0;

let playerNumber = 0;

totalElement0.textContent = total0;
totalElement1.textContent = total1;

function setDice() {
  const DICE_NUMBER = Math.floor(Math.random() * 6) + 1;

  dice.src = `./dice-${DICE_NUMBER}.png`;

  addCurrent(DICE_NUMBER);
}

function addCurrent(dice) {
  if (dice !== 1) {
    if (!playerNumber) {
      current0 += dice;
      currentElement0.textContent = current0;
    } else {
      current1 += dice;
      currentElement1.textContent = current1;
    }
  } else {
    if (!playerNumber) {
      current0 = 0;
      total0 = 0;
      localStorage.setItem('total0', total0);
      currentElement0.textContent = '0';
      totalElement0.textContent = '0';
      changePlayerActive();
      playerNumber = !playerNumber;
    } else {
      current1 = 0;
      total1 = 0;
      localStorage.setItem('total1', total1);
      currentElement1.textContent = '0';
      totalElement1.textContent = '0';
      changePlayerActive();
      playerNumber = !playerNumber;
    }
  }
}

function setHoldValue() {
  if (!playerNumber) {
    total0 += current0;
    localStorage.setItem('total0', JSON.stringify(total0));
    totalElement0.textContent = total0;
    currentElement0.textContent = '0';
    current0 = 0;
    changePlayerActive();

    playerNumber = !playerNumber;
  } else {
    total1 += current1;
    localStorage.setItem('total1', JSON.stringify(total1));
    totalElement1.textContent = total1;
    currentElement1.textContent = '0';
    current1 = 0;
    changePlayerActive();

    playerNumber = !playerNumber;
  }
}

function changePlayerActive() {
  if (!playerNumber) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
  } else {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
  }
}

function resetNewGame() {
  total0 = 0;
  localStorage.setItem('total0', total0);
  totalElement0.textContent = '0';

  total1 = 0;
  localStorage.setItem('total1', total1);
  totalElement1.textContent = '0';

  current0 = 0;
  currentElement0.textContent = '0';

  current1 = 0;
  currentElement1.textContent = '0';
}

btnRoll.addEventListener('click', setDice);
btnHold.addEventListener('click', setHoldValue);
btnNewGame.addEventListener('click', resetNewGame);
