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
                randomEndingPosition = this.randomCoordinate(battleship._length, randomStartingPosition)
            } while (this.humanPlayer.gameboard.getSquareShip(randomStartingPosition) && this.humanPlayer.gameboard.getSquareShip(randomEndingPosition))
                console.log(`game.positionships of player - startCoord: ${randomStartingPosition} //  endCoord: ${randomEndingPosition}`)
            this.humanPlayer.gameboard.placeShip(new Ship(battleship.size), randomStartingPosition, randomEndingPosition)
        })

        //Positioning computer ships - random
        standardFleet.forEach((battleship) => {
            let randomStartingPosition;
            let randomEndingPosition;
            
            do {
                randomStartingPosition = this.randomCoordinate()
                randomEndingPosition = this.randomCoordinate(randomStartingPosition)
            } while (this.computerPlayer.gameboard.getSquareShip(randomStartingPosition) && this.computerPlayer.gameboard.getSquareShip(randomEndingPosition))
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

        //Brainstrom
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
            
            
            do {
                let rowNewRandomCoordinate;
                let colNewRandomCoordinate;
    
                if (direction === 0) {
                    rowNewRandomCoordinate = rowOrigin + shipSize
                    colNewRandomCoordinate = colOrigin
                }
                else if (direction === 1) {
                    rowNewRandomCoordinate = rowOrigin;
                    colNewRandomCoordinate = colOrigin + shipSize
                }
                randomCoordinate = this.humanPlayer.gameboard.convertArrayPositionToStringCoordinate([colNewRandomCoordinate, rowNewRandomCoordinate])

            } while(rowNewRandomCoordinate <= 9 && rowNewRandomCoordinate >= 9 && colNewRandomCoordinate <= 9 && colNewRandomCoordinate >=9  && this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate))


            return randomCoordinate
        }




        // if (originCoordinate) {
        //     const originColumn = originCoordinate[0];
        //     const originRow = parseInt(originCoordinate.slice(1), 10);

        //     const columnIndex = columns.indexOf(originColumn);
        //     const possibleColumns = [
        //         columns[columnIndex - 1] || null,
        //         originColumn,
        //         columns[columnIndex + 1] || null
        //     ].filter(Boolean);

        //     const possibleRows = [
        //         originRow - 1 >= 1 ? originRow - 1 : null,
        //         originRow,
        //         originRow + 1 <= rows ? originRow + 1 : null
        //     ].filter(Boolean);

        //     const orthogonalCoordinates = [];

        //     possibleColumns.forEach((col) => {
        //         possibleRows.forEach((row) => {
        //             if (col === originColumn || row === originRow) { // Ensure no diagonal positions
        //                 orthogonalCoordinates.push(`${col}${row}`);
        //             }
        //         });
        //     });

        //     do {
        //         randomCoordinate = orthogonalCoordinates[Math.floor(Math.random() * orthogonalCoordinates.length)];
        //     } while (this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate) || randomCoordinate === originCoordinate);

        //     return randomCoordinate;
        // }

        do {
            const randomColumn = columns[Math.floor(Math.random() * columns.length)];
            const randomRow = Math.floor(Math.random() * rows) + 1;
            randomCoordinate = `${randomColumn}${randomRow}`;
        } while (this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate));
        return randomCoordinate;
    }

}