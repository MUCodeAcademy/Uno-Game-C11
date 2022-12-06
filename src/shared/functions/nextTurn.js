export function nextTurn(turn, isReverse, players, activeCard) {
  let plusOne = isReverse ? -1 : 1;
  let next = checkOverflow(turn + plusOne, players.length);
  let skipped = checkOverflow(turn + plusOne * 2, players.length);
  return { next, skipped };
}

function checkOverflow(newTurn, playerLength) {
  if (newTurn >= 0 && newTurn < playerLength) {
    return newTurn;
  }
  if (newTurn < 0) {
    return newTurn + playerLength;
  }
  return newTurn - playerLength;
}

export default nextTurn;
