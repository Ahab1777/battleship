import Gameboard from "./gameboard.js";

export default class Player{
    constructor(player){
        this.gameboard = new Gameboard;
        this.name = player;
    }
}