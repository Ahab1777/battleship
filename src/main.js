import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Game from "./game.js";
import { renderGrid } from "./dom-manager.js";


const player = new Player('player')
const computer = new Player('computer')

const match = new Game(player, computer)
// match.positionShips()
// match.makeAttack('A1')
// match.makeAttack('B1')
// match.makeAttack('C1')
// console.log(player.gameboard)
// match.togglePlayers()
// match.makeAttack('C8')
// renderGrid(match);

//Position ships

//Click to attack
const computerSquareNodeList = document.querySelectorAll(`.${computer.name}-container .square`);
computerSquareNodeList.forEach(square => {
    square.addEventListener('click', () => {
        console.log('click')
        const position = square.getAttribute('data-pos');
        match.makeAttack(position);
        renderGrid(match);
        match.checkWinCon();//TODO - skip rest if game ended
        match.togglePlayers()
        //TODO - delay to simulate computer "thinking"
        match.makeAttack
        renderGrid(match);
        match.checkWinCon();
        match.togglePlayers();

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
