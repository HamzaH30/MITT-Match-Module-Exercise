import { gameState } from "./app.js";

// This function is responsible for rendering the game board to match the information in the gameState
function renderBoard() {
  // Creating a static array of all the list elements that are a card
  const elementCards = [...document.getElementsByClassName("card")];
  for (let i = 0; i < elementCards.length; i++) {
    const currentCard = elementCards[i].firstElementChild;

    // Replacing the card's icon class name to match the card's icon class name in gameState
    const currentIcon = currentCard.classList[1];
    const newIcon = gameState.board[i].icon;
    currentCard.classList.replace(currentIcon, newIcon);

    // Adding or removing the matched class based on if the card is matched in the gameState
    if (gameState.board[i].matched) {
      elementCards[i].classList.add("matched");
    } else {
      elementCards[i].classList.remove("matched");
    }

    // Adding or removing the show class based on if the card is being shown in the gameState
    if (gameState.board[i].show) {
      elementCards[i].classList.add("show");
    } else {
      elementCards[i].classList.remove("show");
    }
  }

  // Update the "Next Card"/"Card to find" to be the same as the one listed in the gameState
  const nextCardElement =
    document.getElementById("next-card").firstElementChild;
  const oldCardToFind = nextCardElement.classList[1];
  nextCardElement.classList.replace(oldCardToFind, gameState.cardToFind);

  // Update the score
  document.getElementById("score").innerText = gameState.score;
}

export default renderBoard;
