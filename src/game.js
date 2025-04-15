import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";


//start new game

//create two players X
//position ships

//check who's turn it is
//select square
//check if misses or not
//check if opponent fleet is sunk
//change player

export default class Game{
    constructor() {
        this.humanPlayer = new Player('player');
        this.computerPlayer = new Player('computer');
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
        this.humanPlayer.placeShip(new Ship(3), 'A1', 'C1')
        this.computerPlayer.placeShip(new Ship(3), 'A2', 'C2')
    }

    runTurn(targetCoordinate){
        this.defendingPlayer.gameboard.receiveAttack(targetCoordinate)
        if (this.defendingPlayer.gameboard.isFleetSunk()) {
            alert(`${this.attackingPlayer.name} has won`)
        }
    }



}