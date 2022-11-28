
export default function dealCards(deck, playerCount) {
    let hands = Array(playerCount).fill([]);

    for (const hand of hands) {
        for (i = 0; i < 7; i++) {
            hand.push(deck.pop());
        }
    }

    return { deck, hands };

}
