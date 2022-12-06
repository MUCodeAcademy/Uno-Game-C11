export function reshuffleDeck(discardDeck) {
  let currentIndex = discardDeck.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [discardDeck[currentIndex], discardDeck[randomIndex]] = [
      discardDeck[randomIndex],
      discardDeck[currentIndex],
    ];
  }

  return discardDeck;
}
//remove activeCard from reshuffled play deck

export default reshuffleDeck;
