export function removeCardFromHand(players, playerIndex, cardToRemove) {
    const cardIndex = players[playerIndex].hand.findIndex((card) => {
        return JSON.stringify(card) === JSON.stringify(cardToRemove);
    });
    players[playerIndex].hand.splice(cardIndex, 1);

    return [...players];
}

export default removeCardFromHand;
