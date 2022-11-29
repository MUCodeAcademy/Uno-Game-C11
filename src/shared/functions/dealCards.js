export default function dealCards(deck, playerCount) {
    let hands = Array(playerCount);

    for (let j = 0; j < hands.length; j++) {
        let arr = [];
        for (let i = 0; i < 7; i++) {
            arr.push(deck.pop());
        }
        hands[j] = arr;
        // console.log(hands);
    }

    return { deck, hands };
}
