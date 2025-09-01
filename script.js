'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

const currentElement0 = document.querySelector('#current--0');
const currentElement1 = document.querySelector('#current--1');
const totalElement0 = document.querySelector('#score--0');
const totalElement1 = document.querySelector('#score--1');
const sectionElement0 = document.querySelector('.player--0');
const sectionElement1 = document.querySelector('.player--1');

let current0 = 0;
let current1 = 0;
let total0 = JSON.parse(localStorage.getItem('total0')) || 0;
let total1 = JSON.parse(localStorage.getItem('total1')) || 0;

let playerNumber = 0;

totalElement0.textContent = total0;
totalElement1.textContent = total1;

function setDice() {
  const DICE_NUMBER = Math.floor(Math.random() * 6) + 1;

  dice.src = `./img/dice-${DICE_NUMBER}.png`;

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
      currentElement0.textContent = '0';
      changePlayerActive();
      playerNumber = !playerNumber;
    } else {
      current1 = 0;
      currentElement1.textContent = '0';
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
    setWinner();

    playerNumber = !playerNumber;
  } else {
    total1 += current1;
    localStorage.setItem('total1', JSON.stringify(total1));
    totalElement1.textContent = total1;
    currentElement1.textContent = '0';
    current1 = 0;
    changePlayerActive();
    setWinner();

    playerNumber = !playerNumber;
  }
}

function changePlayerActive() {
  if (!playerNumber) {
    sectionElement0.classList.remove('player--active');
    sectionElement1.classList.add('player--active');
  } else {
    sectionElement1.classList.remove('player--active');
    sectionElement0.classList.add('player--active');
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

  sectionElement0.classList.remove('player--winner');
  sectionElement0.classList.add('player--active');
  sectionElement1.classList.remove('player--winner');
  sectionElement1.classList.remove('player--active');

  btnRoll.disabled = false;
  btnHold.disabled = false;
  btnRoll.style.backgroundColor = 'white';
  btnHold.style.backgroundColor = 'white';
}

function setWinner() {
  if (total0 >= 30) {
    sectionElement0.classList.add('player--winner');
    btnRoll.disabled = true;
    btnHold.disabled = true;
    btnRoll.style.backgroundColor = 'gray';
    btnHold.style.backgroundColor = 'gray';
  } else if (total1 >= 30) {
    sectionElement1.classList.add('player--winner');
    btnRoll.disabled = true;
    btnHold.disabled = true;
    btnRoll.style.backgroundColor = 'gray';
    btnHold.style.backgroundColor = 'gray';
  }
}

btnRoll.addEventListener('click', setDice);
btnHold.addEventListener('click', setHoldValue);
btnNewGame.addEventListener('click', resetNewGame);
