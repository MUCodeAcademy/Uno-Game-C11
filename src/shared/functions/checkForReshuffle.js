import shuffleDeck from "./shuffleDeck";

export default function checkForReshuffle(playDeck, discardDeck) {
    if (playDeck.length === 1) {
        playDeck = shuffleDeck(discardDeck);
    }
    return playDeck;
}
