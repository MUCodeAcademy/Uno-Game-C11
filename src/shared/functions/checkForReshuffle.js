import shuffleDeck from "./shuffleDeck";

export function needsReshuffle(playDeck) {
  if (playDeck.length === 1) {
    return true;
  }
  return false;
}

export default needsReshuffle;
