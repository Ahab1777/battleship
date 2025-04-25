import Gameboard from "./gameboard.js";
import Game from "./game.js";

//render board

export function renderGrid(match) {
    //TODO Enemy fleet remaining 

    const player = match.humanPlayer
    const computer = match.computerPlayer
    
    //render fleet(docked ships)
    //create node of ship elements
    const shipsNode = document.querySelectorAll('.docked-ship')
    console.log("🚀 ~ renderGrid ~ shipsNode:", shipsNode)
    
    // Check ships direction for correct styling
    shipsNode.forEach(ship => {

        if (ship.dataset.direction === 'vertical') {
            console.log("🚀 ~ renderGrid ~ ship.direction:", ship.dataset.direction)
            ship.classList.remove('horizontal')
            ship.classList.add('vertical')
        }
        else if (ship.dataset.direction === 'horizontal') {
            console.log("🚀 ~ renderGrid ~ ship.direction:", ship.dataset.direction)
            ship.classList.remove('vertical')
            ship.classList.add('horizontal')
        } 
        //render each square after emptying the old squares
        const shipSize = ship.dataset.size
        ship.innerHTML = '';
        for (let i = 0; i < shipSize; i++) {
            const squareElement = document.createElement("div");
            squareElement.classList.add('square', 'ship');
            ship.appendChild(squareElement);
        }
    })
    console.log('triggered')
    //empty docks and refill with remaining docked ships
    const fleetContainer = document.querySelector('.fleet')
    fleetContainer.innerHTML = '';
    shipsNode.forEach(ship => {
        fleetContainer.appendChild(ship)
    })


    //render board - player
    const playerSquareNodeList = document.querySelectorAll(`.${player.name}-container .square`);
    playerSquareNodeList.forEach(square => {
        const position = square.getAttribute('data-pos');
        const [row, col] = player.gameboard.convertStringCoordinateToArrayPosition(position)

        const boardSquare = player.gameboard._board[row][col]

        //Square logic
        //1 - Intact ship
        const squareShip = player.gameboard.getSquareShip(position);
        if (squareShip && !squareShip.sunkStatus) {
            square.classList.add('ship');
        }
        //2 - is hit - missed
        if (boardSquare.hitStatus && !boardSquare.ship) {
            square.classList.add('miss')
        }
        //3 - is hit - ship hit
        if (boardSquare.hitStatus && boardSquare.ship) {
            square.classList.add('hit')
            square.classList.remove('ship');
        }
        //4 - is hit - sunk
        if (squareShip && squareShip.sunkStatus) {
            square.classList.add('sunk');
            square.classList.remove('ship');

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

export function resetDOM() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.className = 'square'; // Reset all classes
    });

    const display = document.querySelector('.game-status');
    display.textContent = ''; // Clear the game status display

    const computerSquareNodeList = document.querySelectorAll(`.computer-container .square`);
    computerSquareNodeList.forEach(square => {
        const newSquare = square.cloneNode(true); // Clone the square to remove all listeners
        square.parentNode.replaceChild(newSquare, square);
    });

    const playerSquareNodeList = document.querySelectorAll(`.player-container .square`);
    playerSquareNodeList.forEach(square => {
        const newSquare = square.cloneNode(true); // Clone the square to remove all listeners
        square.parentNode.replaceChild(newSquare, square);
    });

}
