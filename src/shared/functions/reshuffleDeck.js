export function reshuffleDeck(discardDeck, activeCard) {
    debugger;
    let curIdx = discardDeck.length;
    let rdmIdx;

    while (curIdx != 0) {
        rdmIdx = Math.floor(Math.random() * curIdx);
        curIdx--;
        [discardDeck[curIdx], discardDeck[rdmIdx]] = [
            discardDeck[rdmIdx],
            discardDeck[curIdx],
        ];
    }

    //remove activeCard from reshuffled play deck
    let idx = discardDeck.findIndex(
        (e) => e.color === activeCard.color && e.value === activeCard.value
    );
    discardDeck.splice(idx);

    return discardDeck;
}

export default reshuffleDeck;
