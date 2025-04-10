import Gameboard from "./gameboard"
import Ship from "./ship"

describe('Place submarine on board and sink it', () => {
    const gameboard = new Gameboard
    let submarine = new Ship(3)
    
    let c1 = [0,0], c2 = [2,0]

    beforeEach(() => {
        submarine = new Ship(3)
    })

    test('Place submarine on A1 horizontally', () => {
        expect(gameboard.getSquareShip(c1)).toBeFalsy()
        gameboard.placeShip(submarine, c1, c2)
        expect(gameboard.getSquareShip(c1)).toBeTruthy()
    })

    test('Hit submarine on A2 and check if A1 and A3 are still intact', () => {
        gameboard.placeShip(submarine, c1, c2)
        expect(gameboard.squareHitStatus(c1)).toBe(false)
        expect(gameboard.squareHitStatus([0,1])).toBe(false)
        expect(gameboard.squareHitStatus(c2)).toBe(false)
        gameboard.receiveAttack([0,1])
        expect(gameboard.squareHitStatus(c1)).toBe(false)
        expect(gameboard.squareHitStatus([0,1])).toBe(true)
        expect(gameboard.squareHitStatus(c2)).toBe(false)
    })

    test('')

})