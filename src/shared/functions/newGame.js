import buildDeck from "./buildDeck";
import dealCards from "./dealCards";
import shuffleDeck from "./shuffleDeck";

//assuming players looks something like this
const dummyPlayers = [
  { name: "player1", hand: [], isTurn: false },
  { name: "player2", hand: [], isTurn: false },
];

export function newGame(players) {
  // const { started, sendStart, endTurn, sendCards, cards, drawCard } = useSocketHook();
  const deck = shuffleDeck(buildDeck());
  const gameStartCard = null;
  let { deck: newDeck, hands } = dealCards(deck, players.length);

  for (let i = 0; i < players.length; i++) {
    players[i].hand = hands[i];
  }

  for (let i = newDeck.length - 1; i >= 0; i--) {
    if (
      newDeck[i].color !== CardColor.Black &&
      newDeck[i].value !== CardValue.Skip &&
      newDeck[i].value !== CardValue.Reverse &&
      newDeck[i].value !== CardValue.DrawTwo
    ) {
      gameStartCard = newDeck.splice(i, 1)[0];
      break;
    }
  }

  return { newDeck, players, gameStartCard };
}

export default newGame;
