import Game from "./game";

describe('Game controls', () => {
    const match = new Game;
    
    test('Player are toggled between attacking and defending player', () => {
        expect(match.attackingPlayer).toBe(match.humanPlayer)
        expect(match.defendingPlayer).toBe(match.computerPlayer)
        match.togglePlayers()
        expect(match.attackingPlayer).toBe(match.computerPlayer)
        expect(match.defendingPlayer).toBe(match.humanPlayer)
    })
})

