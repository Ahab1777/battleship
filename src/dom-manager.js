import Gameboard from "./gameboard.js";
import Game from "./game.js";

//render board

export function renderGrid(match) {
    //TODO Enemy fleet remaining 
    //TODO make clicked squares unclickable 

    const player = match.humanPlayer
    const computer = match.computerPlayer

    //render board - player
    const playerSquareNodeList = document.querySelectorAll(`.${player.name}-container .square`);
    playerSquareNodeList.forEach(square => {
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
        const squareShip = player.gameboard.getSquareShip(position);
        if (squareShip && squareShip.sunkStatus) {
            square.classList.add('sunk');
        }
       

    })

    //render board- computer
    const computerSquareNodeList = document.querySelectorAll(`.${computer.name}-container .square`);
    computerSquareNodeList.forEach(square => {
        const position = square.getAttribute('data-pos');
        const [row, col] = computer.gameboard.convertStringCoordinateToArrayPosition(position)

        const boardSquare = computer.gameboard._board[row][col]

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
        const squareShip = computer.gameboard.getSquareShip(position);
        if (squareShip && squareShip.sunkStatus) {
            square.classList.add('sunk');
        }
        if (squareShip && !squareShip.sunkStatus) {
            square.classList.add('ship');
        }

    })

    //display logic
    const display = document.querySelector('.game-status')
    //if game ended - display winner
    if (match.gameHasEnded && match.winner === match.humanPlayer) {
        display.textContent = `You won the battle!`
    }
    else if (match.gameHasEnded && match.winner === match.computerPlayer) {
        display.textContent = 'The computer has won!'
    }
    else if (!match.gameHasEnded) {
        display.textContent = `${match.attackingPlayer.name}, make your move`
    }
    
}

// export function updateGameStatus(currentPlayer){
//     const statusDisplay = document.querySelector('.game-status')

//     statusDisplay.innerHTML = `
//     Current player: ${currentPlayer}
//     `
// }

