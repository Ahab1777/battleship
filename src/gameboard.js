import Ship from "./ship";

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

    convertCoordinateToArrayPosition(rowColumnString){
        const rowString = rowColumnString[0]
        const row = rowString.charCodeAt(0);
        const column = parseInt(rowColumnString.slice(1), 10);
        //check if coordinate is valid
        if (!(row >= 65 && row <= 74) || !(column >= 1 && column <= 10)) {
            throw new Error("Invalid coordinate");
        }
        return [row - 65, column - 1]
    }

    
    receiveAttack(coordinate){
        const position = this.convertCoordinateToArrayPosition(coordinate)
        this._board[position[0]][position[1]].squareHit()
    }
    
    isFleetSunk() {
        return this._fleet.length > 0 && this._fleet.every(ship => ship.sunkStatus);
    }

    squareHitStatus(coordinate){
        const position = this.convertCoordinateToArrayPosition(coordinate)
        return this._board[position[0]][position[1]].hitStatus
    }
    
    getSquareShip(coordinate){
        const position = this.convertCoordinateToArrayPosition(coordinate)
        return this._board[position[0]][position[1]].ship
    }
    
    placeShip(ship, startCoordinate, endCoordinate){
        const size = ship.shipSize;
        const startPosition = this.convertCoordinateToArrayPosition(startCoordinate)
        const endPosition = this.convertCoordinateToArrayPosition(endCoordinate)
        //populate board in correct direction until ship length size
        if (startPosition[0] != endPosition[0]) { //if X axis changes, ship is horizontal
            const xAxis = startPosition[0]
            const yAxis = startPosition[1]
            for (let x = 0; x < size; x++) {
                this._board[xAxis + x][yAxis].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
        else if (startPosition[1] != endPosition[1]) {//if Y axis changes, ship is vertical
            const xAxis = startPosition[0]
            const yAxis = startPosition[1]
            for (let y = 0; y < size; y++) {
                this._board[xAxis][yAxis + y].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
    }
    
}

export class Square{
    constructor(){
        this._hasBeenHit = false
        this._ship = false
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