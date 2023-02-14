'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const curr0El = document.querySelector('#current--0');
const curr1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //check if game is going
  if (playing) {
    //1. Generate a random dice
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1
    if (dice !== 1) {
      // 3. Add dice to current score
      currentScore += dice;
      // change curscore dynamically, to active player
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Hold score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add score to active player score
    //scores[0]
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score > 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //disable buttons and dice
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//new game

btnNew.addEventListener('click', init);
