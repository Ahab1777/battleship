import Game from "./game";
import Player from "./player";



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
        match.

    })

    test('player attacks computer', () => {
        expect(match.humanPlayer.gameboard._fleet.length).toBe(1)
        expect(match.)
        match.makeAttack('A1')
        match.makeAttack('B1')
        match.makeAttack('C1')
        expect(match.computerPlayer.gameboard.isFleetSunk()).toBe(true)


    })
})

