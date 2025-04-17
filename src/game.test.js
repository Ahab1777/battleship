import Game from "./game";
import Player from "./player";
import Ship from "./ship";


describe('Game controls', () => {
    let match;
    let player;
    let computer;
    
    beforeEach(() => {
        player = new Player('human')
        computer = new Player('computer')
        match = new Game(player, computer)
        match.positionShips()//currently without variable for testing
    })
    
    test('Player are toggled between attacking and defending player', () => {
        expect(match.attackingPlayer).toBe(match.humanPlayer)
        expect(match.defendingPlayer).toBe(match.computerPlayer)
        match.togglePlayers()
        expect(match.attackingPlayer).toBe(match.computerPlayer)
        expect(match.defendingPlayer).toBe(match.humanPlayer)
    })

    test('position ships', () => {
        expect().toBe()//on hold
    })

    test('check if fleet correctly set', () => {
        expect(match.humanPlayer.gameboard._fleet.length).toBe(1)
        match.humanPlayer.gameboard.placeShip(new Ship(2), 'B2', 'B3')
        expect(match.humanPlayer.gameboard._fleet.length).toBe(2)

    })

    test('player attacks computer', () => {
        expect(match.computerPlayer.gameboard._fleet.length).toBe(1)
        expect(match.computerPlayer.gameboard._fleet[0]).toBeInstanceOf(Ship)
        expect(match.computerPlayer.gameboard._fleet[0].hitCount).toBe(0)
        expect(match.computerPlayer.name).toBe('computer')
        expect(match.humanPlayer.name).toBe('human')
        expect(match.attackingPlayer).toBeInstanceOf(Player)
        match.makeAttack('A1')
        expect(match.computerPlayer.gameboard._fleet[0].hitCount).toBe(1)
        match.makeAttack('B1')
        expect(match.computerPlayer.gameboard._fleet[0].hitCount).toBe(2)
        match.makeAttack('C1')
        expect(match.computerPlayer.gameboard.isFleetSunk()).toBe(true)
    })

    test('player wins game', () => {
        match.makeAttack('A1')
        match.makeAttack('B1')
        expect(match.defendingPlayer.gameboard._fleet[0].sunkStatus).toBe(false)
        expect(match.defendingPlayer.gameboard.isFleetSunk()).toBe(false)
        expect(match.gameHasEnded).toBe(false)
        match.makeAttack('C1')
        expect(match.defendingPlayer.gameboard._fleet[0].sunkStatus).toBe(true)
        expect(match.defendingPlayer.gameboard.isFleetSunk()).toBe(true)
        match.checkWinCon()
        expect(match.gameHasEnded).toBe(true)
    })
})

