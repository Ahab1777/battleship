import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import { renderGrid } from "./dom-manager.js";
import { arrayToString, stringToArray, checkIfStringOutOfBounds, checkIfArrayOutOfBounds } from "./utils.js";

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

    positionShips(standardFleet){
        //randomly place ships on each players board
        

        //place ships in board
        //TODO place them randomly
        // this.humanPlayer.gameboard.placeShip(new Ship(3), 'A1', 'C1')
        // this.computerPlayer.gameboard.placeShip(new Ship(3), 'A1', 'C1')

        //Positioning player ships - random
        standardFleet.forEach((battleship) => {
            let randomStartingPosition;
            let randomEndingPosition;
            
            let attempts = 0; //testing
            const maxAttempts = 1000;   //testing 
            let isOverlap = false;
            let isOutOfBounds = false;
            do {
                randomStartingPosition = this.randomCoordinate();
                randomEndingPosition = this.randomCoordinate(battleship.size, randomStartingPosition);

                const [startRow, startCol] = stringToArray(randomStartingPosition)
                const [endRow, endCol] = stringToArray(randomEndingPosition)

                //Check position of ship
                    //Iterate over each square in ships direction to check if another ship is present
                isOverlap = false; //reset reference
                isOutOfBounds = false // reset reference
                if (startRow === endRow) { //ship is horizontal
                    for (let index = 0; index < battleship.size; index++) {
                        let currentCoordinate = arrayToString([startRow, startCol + index])
                        if (checkIfStringOutOfBounds(currentCoordinate)) {
                            isOutOfBounds = true
                            continue
                        }
                        if(this.humanPlayer.gameboard.getSquareShip(currentCoordinate)){
                            isOverlap = true;
                        }
                    }
                }
                else if (startCol === endCol){ //ship is vertical
                    for (let index = 0; index < battleship.size; index++) {
                        let currentCoordinate = arrayToString([startRow + index, startCol])
                        if (checkIfStringOutOfBounds(currentCoordinate)) {
                            isOutOfBounds = true
                            continue
                        }
                        //console.log(`startCol ${startCol} // endCol ${endCol} // Current coordinate ${currentCoordinate}`)
                        
                        if(this.humanPlayer.gameboard.getSquareShip(currentCoordinate)){
                            isOverlap = true;
                        }
                    }
                }



                attempts++;
                if (attempts > maxAttempts) {
                    throw new Error("Unable to find valid positions for players's ship placement.");
                }
            } while (
                isOverlap ||
                isOutOfBounds ||
                randomStartingPosition === randomEndingPosition
            );
                
            this.humanPlayer.gameboard.placeShip(new Ship(battleship.size), randomStartingPosition, randomEndingPosition)
        })

        //Positioning computer ships - random
        standardFleet.forEach((battleship) => {
            let randomStartingPosition;
            let randomEndingPosition;

            let attempts = 0; //testing
            const maxAttempts = 1000;   //testing 
            let isOverlap = false;
            let isOutOfBounds = false;
            do {
                randomStartingPosition = this.randomCoordinate()
                randomEndingPosition = this.randomCoordinate(battleship.size, randomStartingPosition)

                const [startRow, startCol] = stringToArray(randomStartingPosition)
                const [endRow, endCol] = stringToArray(randomEndingPosition)

                isOverlap = false; //reset reference
                isOutOfBounds = false // reset reference
                if (startRow === endRow) { //ship is horizontal
                    for (let index = 0; index < battleship.size; index++) {
                        let currentCoordinate = arrayToString([startRow, startCol + index])
                        if (checkIfStringOutOfBounds(currentCoordinate)) {
                            isOutOfBounds = true
                            continue
                        }
                        //console.log(`startRow ${startRow} // endRow ${endRow} // Current coordinate ${currentCoordinate}`)
                        if(this.computerPlayer.gameboard.getSquareShip(currentCoordinate)){
                            isOverlap = true;
                        }
                    }
                }
                else if (startCol === endCol){ //ship is vertical
                    for (let index = 0; index < battleship.size; index++) {
                        let currentCoordinate = arrayToString([startRow + index, startCol])
                        if (checkIfStringOutOfBounds(currentCoordinate)) {
                            isOutOfBounds = true
                            continue
                        }
                        //console.log(`startCol ${startCol} // endCol ${endCol} // Current coordinate ${currentCoordinate}`)
                        
                        if(this.computerPlayer.gameboard.getSquareShip(currentCoordinate)){
                            isOverlap = true;
                        }
                    }
                }

                attempts++;
                if (attempts > maxAttempts) {
                    throw new Error("Unable to find valid positions for computer's ship placement.");
                }
            } while (
                isOverlap ||
                isOutOfBounds ||
                randomStartingPosition === randomEndingPosition
            )
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

            const attempts = 100;
            let timesAttempted = 0;
            do {
                switch (direction) {
                    case 0: // Vertical
                        if ((rowOrigin + shipSize) > 9) {
                            rowNewRandomCoordinate = rowOrigin - shipSize
                            colNewRandomCoordinate = colOrigin;
                        }
                        else{
                            rowNewRandomCoordinate = rowOrigin + shipSize
                            colNewRandomCoordinate = colOrigin;
                        }
                        break;
                    case 1: // Horizontal
                        if ((colOrigin + shipSize) > 9) {
                            rowNewRandomCoordinate = rowOrigin;
                            colNewRandomCoordinate = colOrigin - shipSize;
                        }
                        else{
                            rowNewRandomCoordinate = rowOrigin;
                            colNewRandomCoordinate = colOrigin + shipSize;
                        }
                        break
                    default:
                        break;
                }
                // console.log(`Attempting to convert ${colNewRandomCoordinate},${rowNewRandomCoordinate}`)

                randomCoordinate = this.humanPlayer.gameboard.convertArrayPositionToStringCoordinate([colNewRandomCoordinate, rowNewRandomCoordinate])

                // console.log(`${colNewRandomCoordinate},${rowNewRandomCoordinate} is converted into ${randomCoordinate}`)

                timesAttempted++
                if (timesAttempted >= attempts) {
                    throw new Error('Max number of attempts reached')
                }
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