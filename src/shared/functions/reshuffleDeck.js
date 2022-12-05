export function reshuffleDeck(playDeck, discardDeck, activeCard) {
    debugger;
    let curIdx = discardDeck.length;
    let rdmIdx;

    while (curIdx != 0) {
        rdmIdx = Math.floor(Math.random() * curIdx);
        curIdx--;
        [playDeck[curIdx], playDeck[rdmIdx]] = [playDeck[rdmIdx], playDeck[curIdx]];
    }

    //remove activeCard from reshuffled play deck
    let idx = playDeck.findIndex(
        (e) => e === activeCard.CardColor && e === activeCard.CardValue
    );
    playDeck.splice(idx);

    return playDeck;
}

export default reshuffleDeck;
