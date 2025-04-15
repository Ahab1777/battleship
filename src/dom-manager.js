import Gameboard from "./gameboard.js";
import Game from "./game.js";

//render board

export function renderGrid(player) {
    //TODO Enemy fleet remaining 
    //TODO make clicked squares unclickable 
    //render board
    const squareNodeList = document.querySelectorAll(`.${player.name}-container .square`);
    
    squareNodeList.forEach(square => {
        const position = square.getAttribute('data-pos');
        const [row, col] = player.gameboard.convertStringCoordinateToArrayPosition(position)

        const boardSquare = player.gameboard._board[row][col]

        //Square logic
        //1 - is hit - missed
        if (boardSquare.hitStatus && !boardSquare.ship) {
            square.classList.add('miss')
        }
        //2 - is hit - ship hit
        if (boardSquare.hitStatus && boardSquare.ship) {
            square.classList.add('hit')
        }
        //3 - is hit - sunk
        if (player.gameboard.getSquareShip(position).sunkStatus) {
            square.classList.add('sunk')
        }
        


    })
}

// export function updateGameStatus(currentPlayer){
//     const statusDisplay = document.querySelector('.game-status')

//     statusDisplay.innerHTML = `
//     Current player: ${currentPlayer}
//     `
// }

