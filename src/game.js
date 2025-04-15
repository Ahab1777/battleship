import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";
import { renderGrid, updateGameStatus } from "./dom-manager";

//start new game

//TODO position ships

//check who's turn it is
//select square
//check if misses or not
//check if opponent fleet is sunk
//change player

export default class Game{
    constructor(humanPlayer, computerPlayer) {
        this.humanPlayer = humanPlayer;
        this.computerPlayer = computerPlayer;
        this.attackingPlayer = this.humanPlayer;
        this.defendingPlayer = this.computerPlayer;
    }

    togglePlayers(){
        this.attackingPlayer = this.attackingPlayer === this.humanPlayer ? this.computerPlayer : this.humanPlayer;

        this.defendingPlayer = this.defendingPlayer === this.humanPlayer ? this.computerPlayer : this.humanPlayer;
        updateGameStatus(this.attackingPlayer)
    }

    positionShips(){
        //randomly place ships on each players board
        const standardFleet = [
            {
            type: 'carrier',
            size: 5
            },
            // {
            // type: 'battleship',
            // size: 4
            // },
            // {
            // type: 'cruiser',
            // size: 3
            // },
            // {
            // type: 'submarine',
            // size: 3
            // },
            // {
            // type: 'destroyer',
            // size: 2
            // }
        ];

        //place ships in board
        //TODO place them randomly
        this.humanPlayer.placeShip(new Ship(3), 'A1', 'C1')
        this.computerPlayer.placeShip(new Ship(3), 'A2', 'C2')
    }

    runTurn(){

    }


    //human plays
        //render grid - dom-manager.js X
        //click square - main.js
        //grab data-pos - main.js
        //make attack - game.js X
        //check if fleet sunk - gameboard.js X
            //restart game - 
        //re-render grid - dom-manager.js X
        //toggle player - game.js X
        //re-render game status - gameboard.js
    //computer plays
        //make random attack - game.js X
        //check if fleet sunk - gameboard.js X
            //restart game
        //re-render grid - dom-manager.js X
        //toggle player - game.js X
        //re-render game status - dom-manager.js X



    makeAttack(targetCoordinate){
        //check if fleet sunk
        //toggle current player
        //re-render grid that was just attacked


        let coordinate = targetCoordinate
        //if computer is playing, roll random coordinate,else player chooses coordinate
        if (this.attackingPlayer === this.computerPlayer) {
            coordinate = this.randomAttack()
        }
        this.defendingPlayer.gameboard.receiveAttack(coordinate)
        if (this.defendingPlayer.gameboard.isFleetSunk()) {
            alert(`${this.attackingPlayer.name} has won`)
            //TODO restart game logic
        }
    }

    randomAttack(){
        //roll random coordinate
        const columns = 'ABCDEFGHIJ';
        const rows = 10;

        let randomCoordinate;
        do {
            const randomColumn = columns[Math.floor(Math.random() * columns.length)];
            const randomRow = Math.floor(Math.random() * rows) + 1;
            randomCoordinate = `${randomColumn}${randomRow}`;
        } while (this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate));
        return randomCoordinate;
    }

    humanAttack(coordinate){

    }


}