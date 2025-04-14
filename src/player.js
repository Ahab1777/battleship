import Gameboard from "./gameboard";
//Player is about actions
    //attack logic
    //turn handling
    //wincon check


//Refactoring
    //pass fleet to Player
    //

export default class Player{
    constructor(player, gameboard){
        this._gameboard = gameboard;
        this._player = player;
    }


    placeShip(ship, startCoordinate, endCoordinate){
        this.gameboard.placeShip(ship, startCoordinate, endCoordinate)
    }

    receiveAttack(coordinate){
        this._gameboard.receiveAttack(coordinate)
    }

    isPlayerEliminated(){
        return this._gameboard.isFleetSunk()
    }
}