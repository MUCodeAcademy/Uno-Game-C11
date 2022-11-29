import buildDeck from "./buildDeck";
import dealCards from "./dealCards";
import shuffleDeck from "./shuffleDeck";

//assuming players looks something like this
const dummyPlayers = [
    { name: "player1", hand: [], isTurn: false },
    { name: "player2", hand: [], isTurn: false },
];

function newGame(players) {
    const deck = shuffleDeck(buildDeck());
    const gameStartCard = null;
    let { deck: newDeck, hands } = dealCards(deck, players.length);

    for (let i = 0; i < players.length; i++) {
        players[i].hand = hands[i];
    }
    gameStartCard = newDeck.pop();

    return { newDeck, players, gameStartCard };
}

export default newGame;
