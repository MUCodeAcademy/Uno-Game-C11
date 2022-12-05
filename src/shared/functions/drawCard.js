export function drawCard(players, playerIndex, playDeck) {
    players[playerIndex].hand.push(playDeck.pop());
    players = [...players];
    playDeck = [...playDeck];
    return { players, playDeck };
}

export default drawCard;
