import Gameboard, {Square} from "./gameboard"
import Ship from "./ship"

describe('Square class tests', () => {
    let square;
    let destroyer;

    beforeEach(() => {
        square = new Square;
        destroyer = new Ship(2)
        square.ship = destroyer
    })

    test('Set ship on square', () => {
        expect(square.ship).toBe(destroyer)
    })

    test('Hit ship on square', () => {
        square.squareHit()
        expect(square.hitStatus).toBe(true)
    })

    test('checking hit status', () => {
        expect(square.hitStatus).toBe(false)
        square.squareHit()
        expect(square.hitStatus).toBe(true)
    })
})

describe('Isolated gameboard functions test', () => {
    let gameboard;
    
    beforeEach(() => {
        gameboard = new Gameboard
    })

    test('convertStringCoordinateToArrayPosition works', () => {
        expect(gameboard.convertStringCoordinateToArrayPosition('A1')).toEqual([0,0])
        expect(gameboard.convertStringCoordinateToArrayPosition('J3')).toEqual([9,2])
        expect(gameboard.convertStringCoordinateToArrayPosition('F10')).toEqual([5,9])
        expect(gameboard.convertStringCoordinateToArrayPosition('C6')).toEqual([2,5])
    })

    test('receiveAttack', () => {
        const submarine = new Ship(3)
        gameboard.placeShip(submarine, 'B8', 'B10')
        expect(gameboard.squareHitStatus('B9')).toBe(false)
        gameboard.receiveAttack('B9')
        expect(gameboard.squareHitStatus('B9')).toBe(true)
        expect(gameboard.getSquareShip('B9').hitCount).toBe(1)
        gameboard.receiveAttack('B8')
        expect(gameboard.getSquareShip('B9').hitCount).toBe(2)
        gameboard.receiveAttack('B10')
        expect(submarine.sunkStatus).toBe(true)

    })

    test('ship gets sunk', () => {
        const submarine = new Ship(3)
        gameboard.placeShip(submarine, 'B8', 'B10')
        gameboard.receiveAttack('B8')
        gameboard.receiveAttack('B9')
        expect(gameboard._fleet[0].sunkStatus).toBe(false)
        gameboard.receiveAttack('B10')
        expect(gameboard._fleet[0]).toBeTruthy()
        expect(gameboard._fleet[0].sunkStatus).toBe(true)
        expect(gameboard._fleet[1]).toBeFalsy()
        expect(gameboard._fleet.length).toBe(1)
        expect(gameboard._fleet.every(ship => ship.sunkStatus)).toBe(true)

    })


    test('is fleet sunk?', () => {
        const destroyer = new Ship(3)
        gameboard.placeShip(destroyer, 'F8', 'F10')
        expect(gameboard.isFleetSunk()).toBe(false)
        expect(gameboard._fleet[0]).toBe(destroyer)
        gameboard.receiveAttack('F8')
        expect(destroyer.hitCount).toBe(1)
        gameboard.receiveAttack('F9')
        expect(destroyer.hitCount).toBe(2)
        gameboard.receiveAttack('F10')
        expect(gameboard.squareHitStatus('F8')).toBe(true)
        expect(gameboard.squareHitStatus('F9')).toBe(true)
        expect(gameboard._fleet.length).toBe(1)
        expect(gameboard._fleet[0]._length).toBe(gameboard._fleet[0]._hits)
        expect(gameboard.isFleetSunk()).toBe(true)
    })

    test('Fleet grows as ships are added', () => {
        expect(gameboard._fleet.length).toBe(0)
        const destroyer = new Ship(3)
        gameboard.placeShip(destroyer, 'C1','C3')
        expect(gameboard._fleet.length).toBe(1)
        const submarine = new Ship(3)
        gameboard.placeShip(submarine, 'J1','J3')
        expect(gameboard._fleet.length).toBe(2)
        
        

    })
})

describe('Place submarine on board and sink it', () => {
    const gameboard = new Gameboard
    let submarine = new Ship(3)
    
    beforeEach(() => {
        submarine = new Ship(3)
    })

    test('Place submarine on A1 horizontally', () => {
        expect(gameboard.getSquareShip('A1')).toBeFalsy()
        gameboard.placeShip(submarine, 'A1', 'A3')
        expect(gameboard.getSquareShip('A1')).toBeTruthy()
        expect(gameboard.getSquareShip('A1')).toBe(submarine)
    })

    test('Hit submarine on A2 and check if A1 and A3 are still intact', () => {
        gameboard.placeShip(submarine, 'A1', 'A3')
        expect(gameboard.squareHitStatus('A1')).toBe(false)
        expect(gameboard.squareHitStatus('A2')).toBe(false)
        expect(gameboard.squareHitStatus('A3')).toBe(false)
        gameboard.receiveAttack('A2')
        expect(gameboard.squareHitStatus('A1')).toBe(false)
        expect(gameboard.squareHitStatus('A2')).toBe(true)
        expect(gameboard.squareHitStatus('A3')).toBe(false)
    })

})

