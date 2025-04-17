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
        this.gameHasEnded = false;
        this.winner = null;
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
        // this.humanPlayer.gameboard.placeShip(new Ship(3), 'A1', 'C1')
        // this.computerPlayer.gameboard.placeShip(new Ship(3), 'A1', 'C1')

        //Positioning player ships - random
        standardFleet.forEach((battleship) => {
            let randomStartingPosition;
            let randomEndingPosition;
            
            do {
                randomStartingPosition = this.randomCoordinate()
                randomEndingPosition = this.randomCoordinate(randomStartingPosition)
            } while (this.humanPlayer.gameboard.getSquareShip(randomStartingPosition) && this.humanPlayer.gameboard.getSquareShip(randomEndingPosition))
            this.humanPlayer.gameboard.placeShip(new Ship(battleship.size), randomStartingPosition, randomEndingPosition)
        })

        //Positioning computer ships - random
        standardFleet.forEach((battleship) => {
            const randomStartingPosition = this.randomCoordinate()            
            this.computerPlayer.gameboard.placeShip(new Ship(battleship.size), randomStartingPosition, this.randomCoordinate(randomStartingPosition))
        })
    }

    checkWinCon(){
        //check if current defending player's fleet is sunk
        if (this.defendingPlayer.gameboard.isFleetSunk()) {
            this.gameHasEnded = true;
            this.winner = this.attackingPlayer
        }
    }



    makeAttack(targetCoordinate){
        let coordinate = targetCoordinate
        //if computer is playing, roll random coordinate,else player chooses coordinate
        if (this.attackingPlayer === this.computerPlayer) {
            coordinate = this.randomCoordinate()
            this.defendingPlayer.gameboard.receiveAttack(coordinate)
        }
        if (this.attackingPlayer === this.humanPlayer){
            this.defendingPlayer.gameboard.receiveAttack(coordinate)
        }
    }

    randomCoordinate(originCoordinate = null){//Accepts originCoordinate for correctly positioning ships
        //roll random coordinate
        const columns = 'ABCDEFGHIJ';
        const rows = 10;

        let randomCoordinate;
        if (originCoordinate) {
            const originColumn = originCoordinate[0];
            const originRow = parseInt(originCoordinate.slice(1), 10);

            const columnIndex = columns.indexOf(originColumn);
            const possibleColumns = columns.slice(
                Math.max(0, columnIndex - 1),
                Math.min(columns.length, columnIndex + 2)
            );

            const possibleRows = [
                Math.max(1, originRow - 1),
                originRow,
                Math.min(rows, originRow + 1)
            ];

            do {
                const randomColumn = possibleColumns[Math.floor(Math.random() * possibleColumns.length)];
                const randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
                randomCoordinate = `${randomColumn}${randomRow}`;
            } while (this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate) || randomCoordinate === originCoordinate);
            return randomCoordinate
        }
        do {
            const randomColumn = columns[Math.floor(Math.random() * columns.length)];
            const randomRow = Math.floor(Math.random() * rows) + 1;
            randomCoordinate = `${randomColumn}${randomRow}`;
        } while (this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate));
        return randomCoordinate;
    }
    

}