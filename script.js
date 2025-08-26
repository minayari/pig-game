'use strict';

const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');

function setDice() {
  const DICE_NUMBER = Math.floor(Math.random() * 6) + 1;
  dice.src = `./dice-${DICE_NUMBER}.png`;
}

btnRoll.addEventListener('click', setDice);
