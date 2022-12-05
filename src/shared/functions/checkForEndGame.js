export function checkForEndGame(players, playDeck, discardDeck) {
    //WIN
    // const winner = players.filter((p) => p.hand.length === 0);
    const winner = players.find((p) => p.hand.length === 0);
    if (winner) {
        return `${winner.name} has won!`;
    }

    //stalemate
    if (playDeck.length === 0 && discardDeck.length === 0) {
        return "Stalemate. Get better.";
    }

    //host disconnected
    if (!players.find((p) => p.isHost)) {
        return "Game has ended due to host disconnect, all players will now return to waiting area";
    }

    return null;
}

export default checkForEndGame;

//return either null OR the body of the win/stalemate/host d/c message
