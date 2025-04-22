import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Game from "./game.js";
import { renderGrid, resetDOM } from "./dom-manager.js";

const newGameBtn = document.querySelector('.new-game');
newGameBtn.addEventListener('click', () => {
    console.log('clicked')
    resetDOM()
    let player = new Player('player')
    let computer = new Player('computer')
    let match = new Game(player, computer)
    match.positionShips()
    renderGrid(match)

    //Click to attack
    const computerSquareNodeList = document.querySelectorAll(`.${computer.name}-container .square`);
    computerSquareNodeList.forEach(square => {
        square.addEventListener('click', () => {
            const position = square.getAttribute('data-pos');

            // Player's attack
            match.makeAttack(position);
            renderGrid(match);
            match.checkWinCon();
            if (match.gameHasEnded) return; // Stop if the game has ended
            match.togglePlayers();
            // Make the board unclickable
            computerSquareNodeList.forEach(square => {
                square.style.pointerEvents = 'none';
            });

            
            // Re-enable the board after the computer's turn
            setTimeout(() => {
                computerSquareNodeList.forEach(square => {
                    square.style.pointerEvents = 'auto';
                });
            }, 500); // Match the delay of the computer's attack
            
            // Disable the clicked square
            square.style.pointerEvents = 'none';
            // Computer's attack
            setTimeout(() => { // Add a delay to simulate the computer "thinking"
                match.makeAttack();
                renderGrid(match);
                match.checkWinCon();
                if (match.gameHasEnded) return; // Stop if the game has ended
                match.togglePlayers();
                renderGrid(match);
            }, 500); // 500ms delay
        });
    }) 


})
