import Ship from "./ship.js";
import { arrayToString, stringToArray, checkIfArrayOutOfBounds, checkIfStringOutOfBounds } from "./utils.js";

export default class Gameboard{
    constructor(squareGenerator = () => new Square()){
        this._board = this.#generateBoard();
        this._squareGenerator = squareGenerator;
        this._fleet = [];
    }

    #generateBoard() {
        return Array(10)
            .fill()
            .map(() => Array(10).fill().map(() => new Square()));
    }

    convertStringCoordinateToArrayPosition(rowColumnString){
        const rowString = rowColumnString[0]
        const row = rowString.charCodeAt(0);
        const column = parseInt(rowColumnString.slice(1), 10);
        //check if coordinate is valid
        if (!(row >= 65 && row <= 74) || !(column >= 1 && column <= 10)) {
            throw new Error("Invalid coordinate");
        }
        //console.log(`${rowColumnString} becomes ${[row - 65, column - 1]}`)
        return [row - 65, column - 1]
    }

    convertArrayPositionToStringCoordinate(positionArray){
        const [row, column] = positionArray;
        //console.log("🚀 ~ Gameboard ~ convertArrayPositionToStringCoordinate ~ positionArray:", positionArray)
        //check if position is valid
        
        if (!(row >= 0 && row <= 9) || !(column >= 0 && column <= 9)) {
            throw new Error("Invalid position");
        }
        const rowString = String.fromCharCode(row + 65);
        const columnString = (column + 1).toString();
        return rowString + columnString;
    }

    
    receiveAttack(coordinate){
        const [row, col] = stringToArray(coordinate)
        const square = this._board[row][col]
        square.squareHit()
    }
    
    isFleetSunk() {
        return this._fleet.length > 0 && this._fleet.every(ship => ship.sunkStatus);
    }

    squareHitStatus(coordinate){
        const position = stringToArray(coordinate)
        return this._board[position[0]][position[1]].hitStatus
    }
    
    getSquareShip(coordinate){
        const position = stringToArray(coordinate)
        return this._board[position[0]][position[1]].ship
    }
    
    placeShip(ship, startCoordinate, endCoordinate){
        console.log("🚀 ~ Gameboard ~ placeShip ~ startCoordinate:", startCoordinate)
        const size = ship.shipSize;
        const startPosition = stringToArray(startCoordinate)
        const endPosition = stringToArray(endCoordinate)
        //populate board in correct direction until ship length size
        //if X axis changes, ship is horizontal
            //if start X > end X, subtract positioning
            //if start X < end X, add for positioning
        if (startPosition[0] < endPosition[0]) { 
            const xAxis = startPosition[0]
            const yAxis = startPosition[1]
            for (let x = 0; x < size; x++) {
                this._board[xAxis + x][yAxis].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
        else if (startPosition[0] > endPosition[0]){
            const xAxis = startPosition[0]
            const yAxis = startPosition[1]
            for (let x = 0; x < size; x++) {
                this._board[xAxis - x][yAxis].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
        //if Y axis changes, ship is vertical
            //if start Y > end Y, subtract for positioning
            //if start Y < end Y, add for positioning
        else if (startPosition[1] < endPosition[1]) {
            const xAxis = startPosition[0]
            const yAxis = startPosition[1]
            for (let y = 0; y < size; y++) {
                this._board[xAxis][yAxis + y].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
        else if (startPosition[1] > endPosition[1]) {
            const xAxis = startPosition[0]
            const yAxis = startPosition[1]
            for (let y = 0; y < size; y++) {
                this._board[xAxis][yAxis - y].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
        else if (startCoordinate === endCoordinate){
            throw new Error('Start and end coordinates cannot be the same');
        }
    }
    
}

export class Square{
    constructor(){
        this._hasBeenHit = false
        this._ship = null
    }
    
    set ship(ship){
        this._ship = ship
    }
    
    squareHit(){
        if (this._hasBeenHit) {
            return
        }
        if (this._ship) {
            this._ship.hit()
        }
        this._hasBeenHit = true
    }

    get hitStatus(){
        return this._hasBeenHit
    }

    get ship(){
        return this._ship
    }
}



//square variables:
    //hasBeenHit
    //shipPresence