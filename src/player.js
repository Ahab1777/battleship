import Gameboard from "./gameboard";

export default class Player{
    constructor(player){
        this.gameboard = new Gameboard;
        this.name = player;
    }
}