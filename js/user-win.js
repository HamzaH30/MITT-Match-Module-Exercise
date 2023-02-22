import { gameState } from "./app.js";

// This function returns true or false depending on if the user has matched all the cards
function checkIfWin() {
  for (let card of gameState.board) {
    if (!card.matched) {
      // There is still a card that has not been matched, therefore the user has not won yet.
      return false;
    }
  }

  // The function did not return false, therefore all cards have been matched and user wins.
  return true;
}

/**
 * This function is responsible for alerting the user that they have won.
 * This function is being executed after a setTimeout().
 */
function alertUserWin() {
  alert(
    `You have won the game! It took you ${gameState.score} moves!\nYou may restart the game to play again!`
  );
}

export { checkIfWin, alertUserWin };
