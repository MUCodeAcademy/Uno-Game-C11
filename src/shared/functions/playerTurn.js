export default function playerTurn(players, turn, cardIsSkip, turnIsClockwise) {
  let playerIndex = players.indexOf(turn);
  let whoseTurn;

  if (turnIsClockwise) {
    if (cardIsSkip) {
      if ((turn = users.at(-1))) {
        return (whoseTurn = users[1]);
      }
      if ((turn = users.at(-2))) {
        return (whoseTurn = player[0]);
      } else return (whoseTurn = player[playerIndex + 2]);
    } else if ((turn = player.at(-1))) {
      return (whoseTurn = player[0]);
    } else return (whoseTurn = player[playerIndex + 1]);
  }
  if (!turnIsClockwise) {
    if (cardIsSkip) {
      if ((turn = users[0])) {
        return (whoseTurn = player.at(-2));
      }
      if ((turn = player[1])) {
        return (whoseTurn = player.at(-1));
      } else return (whoseTurn = player[playerIndex + 2]);
    } else if ((turn = player[0])) {
      return (whoseTurn = player.at(-1));
    } else return (whoseTurn = player[playerIndex - 1]);
  }
}
