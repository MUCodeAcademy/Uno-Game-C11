export function checkForEndGame(players) {
    const winner = players.find((p) => p.hand.length === 0);
    if (winner) {
        return `${winner.name} has won!`;
    }
    return null;
}

export default checkForEndGame;

//return either null OR the body of the win/stalemate/host d/c message
