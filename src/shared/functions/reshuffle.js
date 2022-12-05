export function reshuffle(playDeck, discardDeck, activeCard) {
    let curIdx = discardDeck.length;
    let rdmIdx;

    while (curIdx != 0) {
        rdmIdx = Math.floor(Math.random() * curIdx);
        curIdx--;
        [playDeck[curIdx], playDeck[rdmIdx]] = [playDeck[rdmIdx], playDeck[curIdx]];
    }

    //remove activeCard from reshuffled play deck
    playDeck = playDeck.find(activeCard);

    return playDeck;
}
