'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //generate random dice number
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if player's score>=100

    if (scores[activePlayer] >= 20) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

const init= function(){
//resetting state variables
currentScore = 0;
activePlayer = 0;
playing = true;
scores = [0, 0];
//hide the dice
diceEl.classList.add('hidden');

getPlayer('current', 0, 1);
getPlayer('score', 0, 1);


player0El.classList.contains('player--winner')
  ? player0El.classList.remove('player--winner')
  : player1El.classList.remove('player--winner');

if (player0El.classList.contains('player--active')) {
  return;
} else {
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
}

const getPlayer = function (class1, player1, player2) {
  const p1 = (document.getElementById(`${class1}--${player1}`).textContent = 0);
  const p2 = (document.getElementById(`${class1}--${player2}`).textContent = 0);
  return p1, p2;
};

btnNew.addEventListener('click',init);
