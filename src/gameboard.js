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

    isFleetSunk() {
        return this._fleet.every(ship => ship.sunkStatus);
    }

    receiveAttack(coordinate){
        this._board[coordinate[0]][coordinate[1]].squareHit()
    }

    squareHitStatus(coordinate){
        return this._board[coordinate[0]][coordinate[1]].hitStatus
    }

    getSquareShip(coordinate){
        return this._board[coordinate[0]][coordinate[1]].ship
    }

    placeShip(ship, startCoordinate, endCoordinate){
        const size = ship.shipSize;
        //populate board in correct direction until ship length size
        if (startCoordinate[0] != endCoordinate[0]) { //if X axis changes, ship is horizontal
            const xAxis = startCoordinate[0]
            const yAxis = startCoordinate[1]
            for (let x = 0; x < size; x++) {
                this._board[xAxis + x][yAxis].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
        else if (startCoordinate[1] != endCoordinate[1]) {//if Y axis changes, ship is vertical
            const xAxis = startCoordinate[0]
            const yAxis = startCoordinate[1]
            for (let y = 0; y < size; y++) {
                this._board[xAxis][yAxis + y].ship = ship//place ship along its direction on board
            }
            this._fleet.push(ship)
        }
    }

}

class Square{
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