/**
 * Name: Hamza Haque
 * Course: JavaScript Basics-SD-110-F22S1
 * Date: January 18, 2023
 * Final Project - MITT Match
 */

import shuffle from "./shuffle.js";
import renderBoard from "./render-board.js";
import { checkIfValidClick } from "./card-click.js";
import { newCardToFind } from "./card-click.js";

// This function is responsible for resetting the gameState
function generateGameState() {
  // Shuffles all the list elements of the cards.
  const elementCards = shuffle([...document.getElementsByClassName("card")]);

  // Emptying the current board and cards that the user has to find.
  gameState.board = [];
  gameState.cardsToFind = [];

  // Populating the cards in the gameState board and setting them to their "default" values
  for (let card of elementCards) {
    // Getting the card icon that each card in the gameState board will have
    const cardIcon = card.firstElementChild.classList[1];

    // Populating the board
    gameState.board.push({
      icon: cardIcon,
      matched: false,
      show: false,
    });
  }

  // New array of the cards that the user has to find
  gameState.cardsToFind = shuffle(gameState.board).map((card) => card.icon);

  // Reset the score and pause state
  gameState.score = 0;
  gameState.pause = false;

  // Change the card that the user has to find, then render the board.
  newCardToFind();
  renderBoard();
}

// This is the variable that stores any relevant information related to the game (game state).
const gameState = {
  cardToFind: "fa-anchor",
  cardsToFind: [],
  board: [],
  score: 0,
  pause: false,
};

// Populating the gameState with the default information
generateGameState();

// Event Listeners for when the user clicks the restart button or a card
document
  .getElementsByClassName("restart")[0]
  .addEventListener("click", generateGameState);
document.getElementById("cards").addEventListener("click", checkIfValidClick);

export { gameState };
