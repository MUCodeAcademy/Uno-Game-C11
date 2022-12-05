export function nextTurn(turn, isReverse, players, activeCard) {
  let plusOne = isReverse ? turn - 1 : turn + 1;
  let next = checkOverflow(plusOne, players.length);
  let skipped = checkOverflow(nextTurn + plusOne, players.length);

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
