export function reshuffleDeck(discardDeck, activeCard) {
    let currentIndex = discardDeck.length;
    let randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [discardDeck[currentIndex], discardDeck[randomIndex]] = [discardDeck[randomIndex], discardDeck[currentIndex]];
    }

    let idx = discardDeck.findIndex((e) => e.color === activeCard.color && e.value === activeCard.value);
    discardDeck.splice(idx, 1);

    return discardDeck;
}
//remove activeCard from reshuffled play deck

export default reshuffleDeck;
