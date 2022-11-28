import { useState } from "react";

export default function useDealCards(deck) {
  const [deck, setDeck] = useState(deck);
  const [startingHand, setStartingHand] = useState([]);
  const topSevenCards = deck.filter((card) => {
    return card.indexOf(card < 7);
  });
  setStartingHand([topSevenCards]);
  const updatedDeck = deck.filter((card) => {
    return card.indexOf(card >= 7);
  });
  setDeck([updatedDeck]);
  return { deck, startingHand };
}
