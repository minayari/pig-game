'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const currentLable = document.querySelector('#current--0');
const scoreLable = document.querySelector('#score--0');

let currentValue = JSON.parse(localStorage.getItem('currentValue0')) || 0;
let holdValue = JSON.parse(localStorage.getItem('currentValue0')) || 0;

function setDice() {
  const DICE_NUMBER = Math.floor(Math.random() * 6) + 1;

  dice.src = `./dice-${DICE_NUMBER}.png`;

  currentValue += DICE_NUMBER;
  localStorage.setItem('currentValue0', JSON.stringify(currentValue));
  currentLable.textContent = currentValue;
}

function setHoldValue() {
  holdValue += currentValue;
  localStorage.setItem('holdValue0', JSON.stringify(holdValue));
  scoreLable.textContent = holdValue;

  currentLable.textContent = 0;
  currentValue = 0;
}

btnRoll.addEventListener('click', setDice);
btnHold.addEventListener('click', setHoldValue);
