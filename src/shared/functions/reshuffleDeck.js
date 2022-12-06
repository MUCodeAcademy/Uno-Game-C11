export function reshuffleDeck(discardDeck) {
    let currentIndex = discardDeck.length;
    let randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        console.log("preshuffle");
        console.log(discardDeck);
        //fdsa
        [discardDeck[currentIndex], discardDeck[randomIndex]] = [discardDeck[randomIndex], discardDeck[currentIndex]];
        console.log("postshuffle");
        console.log(discardDeck);
    }

    return discardDeck;
}
//remove activeCard from reshuffled play deck

export default reshuffleDeck;
