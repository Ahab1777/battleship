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
            
        

            let attempts = 0; //testing
            const maxAttempts = 100;   //testing 
            do {
                randomStartingPosition = this.randomCoordinate();
                randomEndingPosition = this.randomCoordinate(battleship._length, randomStartingPosition);
                console.log(`Start: ${randomStartingPosition}, End: ${randomEndingPosition}`);
                console.log(`Start has ship: ${this.humanPlayer.gameboard.getSquareShip(randomStartingPosition)}`);
                console.log(`End has ship: ${this.humanPlayer.gameboard.getSquareShip(randomEndingPosition)}`);
                attempts++;
                if (attempts > maxAttempts) {
                    throw new Error("Unable to find valid positions for players's ship placement.");
                }
            } while (
                this.humanPlayer.gameboard.getSquareShip(randomStartingPosition) ||
                this.humanPlayer.gameboard.getSquareShip(randomEndingPosition) ||
                randomStartingPosition === randomEndingPosition
            );
                
            console.log(`game.positionShips of player - startCoord: ${randomStartingPosition} //  endCoord: ${randomEndingPosition}`)
            this.humanPlayer.gameboard.placeShip(new Ship(battleship.size), randomStartingPosition, randomEndingPosition)
        })

        //Positioning computer ships - random
        standardFleet.forEach((battleship) => {
            let randomStartingPosition;
            let randomEndingPosition;

            let attempts = 0; //testing
            const maxAttempts = 100;   //testing 
            
            do {
                randomStartingPosition = this.randomCoordinate()
                randomEndingPosition = this.randomCoordinate(battleship._length, randomStartingPosition)

                attempts++;
                if (attempts > maxAttempts) {
                    throw new Error("Unable to find valid positions for computer's ship placement.");
                }
            } while (randomStartingPosition === randomEndingPosition ||
                this.computerPlayer.gameboard.getSquareShip(randomStartingPosition) ||
                this.computerPlayer.gameboard.getSquareShip(randomEndingPosition))
                console.log(` game.positionShips of enemy - startCoord: ${randomStartingPosition} //  endCoord: ${randomEndingPosition}`)
            this.computerPlayer.gameboard.placeShip(new Ship(battleship.size), randomStartingPosition, randomEndingPosition)
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

    randomCoordinate(shipSize = null, originCoordinate = null) { // Accepts originCoordinate for correctly positioning ships

        //Brainstorm
            //randomCoord accepts ship size
            //if origin coord + ship size (direciton should be random) is out of bounds, repeat
            //return coord


        // Roll random coordinate
        const columns = 'ABCDEFGHIJ';
        const rows = 10;

        let randomCoordinate;

        
        if (originCoordinate) {
            const direction = Math.floor(Math.random() * 2); // 0 for vertical, 1 for horizontal
            //if shipSize + originCoordinate direction vertex out of bounds, repeat
            const [colOrigin, rowOrigin] = this.humanPlayer.gameboard.convertStringCoordinateToArrayPosition(originCoordinate)            
            
            
            let rowNewRandomCoordinate;
            let colNewRandomCoordinate;
            do {
    
                if (direction === 0) {
                    rowNewRandomCoordinate = rowOrigin + shipSize - 1;
                    colNewRandomCoordinate = colOrigin;
                }
                else if (direction === 1) {
                    rowNewRandomCoordinate = rowOrigin;
                    colNewRandomCoordinate = colOrigin + shipSize - 1;
                }
                randomCoordinate = this.humanPlayer.gameboard.convertArrayPositionToStringCoordinate([colNewRandomCoordinate, rowNewRandomCoordinate])

            } while(
                rowNewRandomCoordinate < 0 ||
                rowNewRandomCoordinate > 9 ||
                colNewRandomCoordinate < 0 || 
                colNewRandomCoordinate > 9 || 
                this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate))


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