import shuffleDeck from "./shuffleDeck";

// export default function checkForReshuffle(playDeck, discardDeck) {
//     if (playDeck.length === 1) {
//         playDeck = shuffleDeck(discardDeck);
//         discardDeck = []
//     }
//     return playDeck;
// }

export function needsReshuffle(playDeck) {
    if (playDeck.length === 1) {
        return true;
    }
    return false;
}

export default needsReshuffle;
