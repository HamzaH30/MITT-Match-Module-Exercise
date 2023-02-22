import { gameState } from "./app.js";
import { checkIfWin } from "./user-win.js";
import renderBoard from "./render-board.js";
import { alertUserWin } from "./user-win.js";

/**
 * When the user clicks, this function is responsible for calling the revealCard() function only when
 *  1. The user clicks a valid card and not (for example) in between the cards
 *  2. The user hasn't already won.
 *  3. The card that the user clicked isn't already a matched card.
 *  4. The game isn't currently paused
 */
function checkIfValidClick(event) {
  if (event.target.id !== "cards" && !checkIfWin() && !gameState.pause) {
    /**
     * Finding the icon class of the card that the user clicked.
     * There are 2 areas a user can click
     * 1. The middle of the card -> the icon element (child of list element (.card))
     * 2. Somewhere else on the card -> the list element (card class)
     */
    const clickedCardClass =
      event.target.closest(".card").firstElementChild.classList[1];

    // Find which card in the gameState is the exact same card as clickedCardClass
    const gameStateCard = gameState.board.find(
      (element) => element.icon === clickedCardClass
    );

    // The user cannot be able to already open or do anything with a matched card
    if (!gameStateCard.matched) {
      revealCard(gameStateCard);
    }
  }
}

// This function is responsible for revealing a card and changing its properties/gameState keys after a valid click.
function revealCard(cardClicked) {
  // Add this click to the total score
  gameState.score += 1;

  // Check if the card clicked is the same as the card they have to find
  if (cardClicked.icon === gameState.cardToFind) {
    // The card clicked is a match, set matched to true
    cardClicked.matched = true;

    // Generate a new card for the user to find
    newCardToFind();
    renderBoard();
  } else {
    // The card isn't a match with the current "card to find"
    cardClicked.show = true;
    renderBoard();

    // A card is being shown, therefore pause the game
    gameState.pause = true;

    // Hide the card again
    cardClicked.show = false;

    // Only render the board (to visually hide the card) and unpause the game after a set duration.
    setTimeout(() => {
      renderBoard();
      gameState.pause = false;
    }, 750);
  }

  // Check if the user has won the game by matching all cards.
  if (checkIfWin()) {
    // Alerting the user's victory after a slight delay to allow the final card matched to render and display as a matched card.
    setTimeout(() => alertUserWin(), 1);
  }
}

// This function is responsible for generating a new card for the user to find.
function newCardToFind() {
  gameState.cardToFind = gameState.cardsToFind.shift();
}

export { checkIfValidClick, revealCard, newCardToFind };
