export default function removeCardFromHand(players, playerIndex, cardToRemove) {
    const cardIndex = players[playerIndex].hand.findIndex((card) => {
        JSON.stringify(card) === JSON.stringify(cardToRemove);
    });
    players[playerIndex].hand.splice(cardIndex, 1);

    return players;
}
