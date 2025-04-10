
export default class Ship{
    constructor(length){
        this._length = length;
        this._hits = 0;
        this._sunken = false;
    }
    hit(){
        this._hits++;
        this.isSunk();
    }

    isSunk(){
        if (this._hits >= this._length) {
            this._sunken = true;
        }
    }

    get sunkStatus() {
        return this._sunken
    }

    get hitCount() {
        return this._hits
    }

    get shipSize() {
        return this._length
    }
}