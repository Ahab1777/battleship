import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import { renderGrid } from "./dom-manager.js";

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
        this.humanPlayer.gameboard.placeShip(new Ship(3), 'A1', 'C1')
        this.computerPlayer.gameboard.placeShip(new Ship(3), 'A2', 'C2')
    }

    runTurn(){

    }



    makeAttack(targetCoordinate){
        //check if fleet sunk
        //toggle current player
        //re-render grid that was just attacked


        let coordinate = targetCoordinate
        //if computer is playing, roll random coordinate,else player chooses coordinate
        if (this.attackingPlayer === this.computerPlayer) {
            coordinate = this.randomAttack()
            this.defendingPlayer.gameboard.receiveAttack(coordinate)
            return
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