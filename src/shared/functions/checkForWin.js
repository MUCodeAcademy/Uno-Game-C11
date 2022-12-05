export function checkForWin(players) {
  return players.filter((p) => p.hand.length === 0);
}

export default checkForWin;
