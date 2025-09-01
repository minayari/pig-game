'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

let current0 = 0;
let current1 = 0;
let total0 = JSON.parse(localStorage.getItem('total0')) || 0;
let total1 = JSON.parse(localStorage.getItem('total1')) || 0;

let playerNumber = 0;

function setDice() {
  const DICE_NUMBER = Math.floor(Math.random() * 6) + 1;

  dice.src = `./dice-${DICE_NUMBER}.png`;

  addCurrent(DICE_NUMBER);
}

function addCurrent(dice) {
  if (!playerNumber) {
    current0 += dice;
    document.querySelector('#current--0').textContent = current0;
  } else {
    current1 += dice;
    document.querySelector('#current--1').textContent = current1;
  }
}

function setHoldValue() {
  if (!playerNumber) {
    total0 += current0;
    localStorage.setItem('total0', JSON.stringify(total0));
    document.querySelector('#score--0').textContent = total0;
    document.querySelector('#current--0').textContent = '0';
    current0 = 0;

    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');

    playerNumber = !playerNumber;
  } else {
    total1 += current1;
    localStorage.setItem('total1', JSON.stringify(total1));
    document.querySelector('#score--1').textContent = total1;
    document.querySelector('#current--1').textContent = '0';
    current1 = 0;

    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');

    playerNumber = !playerNumber;
  }
}

btnRoll.addEventListener('click', setDice);
btnHold.addEventListener('click', setHoldValue);
