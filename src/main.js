import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Game from "./game.js";
import { renderGrid, updateGameStatus } from "./dom-manager.js";


const player = new Player('player')
const computer = new Player('computer')

const match = new Game(player, computer)

renderGrid(player)
renderGrid(computer)

const playerSquareNodeList = document.querySelectorAll(`.player-container .square`);

playerSquareNodeList.forEach(square => {
    const coordinate = square.getAttribute('data-pos')
    square.addEventListener('click', () => {
        match.makeAttack(coordinate)
        if (match.defendingPlayer.gameboard.isFleetSunk()) {
            //restart game logic
            return
        }
        renderGrid(computer);
        match.togglePlayers();
        updateGameStatus(match.attackingPlayer)
        match.makeAttack()
        if (match.defendingPlayer.gameboard.isFleetSunk()) {
            //restart game logic
            return
        }
        renderGrid(player)
        match.togglePlayers();
        updateGameStatus(match.attackingPlayer)

    })
})


//human plays
    //render grid - dom-manager.js X
    //click square - main.js
    //grab data-pos - main.js
    //make attack - game.js X
    //check if fleet sunk - gameboard.js X
        //restart game - 
    //re-render grid - dom-manager.js X
    //toggle player - game.js X
    //re-render game status - dom-manager.js
//computer plays
    //make random attack - game.js X
    //check if fleet sunk - gameboard.js X
        //restart game
    //re-render grid - dom-manager.js X
    //toggle player - game.js X
    //re-render game status - dom-manager.js X
