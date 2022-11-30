export default function drawCard(players, playerIndex, playDeck) {
    players[playerIndex].hand.push(playDeck.pop());
    return { players, playDeck };
}
