import Player from "./player.js";
import Gameboard, { Square } from "./gameboard.js";
import Game from "./game.js";
import { renderGrid, resetDOM } from "./dom-manager.js";
import { dragStart, dragEnter, dragOver, dragLeave, drop, dragEnd } from "./utils.js";


const standardFleet = [
  {
    type: "carrier",
    size: 5,
  },
  {
    type: "battleship",
    size: 4,
  },
  {
    type: "cruiser",
    size: 3,
  },
  {
    type: "submarine",
    size: 3,
  },
  {
    type: "destroyer",
    size: 2,
  },
];

const newGameBtn = document.querySelector(".new-game");
newGameBtn.addEventListener("click", () => {
  console.log("clicked");
  resetDOM();
  let player = new Player("player");
  let computer = new Player("computer");
  let match = new Game(player, computer);
  match.positionShips(standardFleet);
  renderGrid(match);

  //Click to attack
  const computerSquareNodeList = document.querySelectorAll(
    `.${computer.name}-container .square`
  );
  computerSquareNodeList.forEach((square) => {
    square.addEventListener("click", () => {
      const position = square.getAttribute("data-pos");

      // Player's attack
      match.makeAttack(position);
      renderGrid(match);
      match.checkWinCon();
      if (match.gameHasEnded) return; // Stop if the game has ended
      match.togglePlayers();
      // Make the board unclickable
      computerSquareNodeList.forEach((square) => {
        square.style.pointerEvents = "none";
      });

      // Re-enable the board after the computer's turn
      setTimeout(() => {
        computerSquareNodeList.forEach((square) => {
          square.style.pointerEvents = "auto";
        });
      }, 500); // Match the delay of the computer's attack

      // Disable the clicked square
      square.style.pointerEvents = "none";
      // Computer's attack
      setTimeout(() => {
        // Add a delay to simulate the computer "thinking"
        match.makeAttack();
        renderGrid(match);
        match.checkWinCon();
        if (match.gameHasEnded) return; // Stop if the game has ended
        match.togglePlayers();
        renderGrid(match);
      }, 500); // 500ms delay
    });
  });
});

//Generate fleet for custom positioning
const fleet = document.querySelectorAll(".docked-ship");
fleet.forEach((dock, index) => {
    const shipSize = standardFleet[index].size
    dock.setAttribute('draggable', 'true')
    dock.dataset.size = shipSize
    dock.id = standardFleet[index].type
    dock.addEventListener('dragstart', dragStart)
    dock.addEventListener('dragend', dragEnd)
    for (let i = 0; i < shipSize; i++) {
        const squareElement = document.createElement("div");
        squareElement.classList.add("square", 'ship');
        dock.appendChild(squareElement);
    }
});




//Make player's board a drop-zone
const playerSquareNodeList = document.querySelectorAll(`.player-container .square`)
playerSquareNodeList.forEach(square => {
    square.addEventListener('dragenter', dragEnter)
    square.addEventListener('dragover', dragOver);
    square.addEventListener('dragleave', dragLeave);
    square.addEventListener('drop', drop);
})