export default function playerTurn(players, turn, cardIsSkip, turnIsClockwise) {
  let playerIndex = players.indexOf(turn);
  let whoseTurn;

  if (turnIsClockwise) {
    if (cardIsSkip) {
      if ((turn = users.at(-1))) {
        whoseTurn = users[1];
      } else if ((turn = users.at(-2))) {
        whoseTurn = players[0];
      } else return (whoseTurn = players[playerIndex + 2]);
    } else if ((turn = players.at(-1))) {
      whoseTurn = players[0];
    } else whoseTurn = players[playerIndex + 1];
  } else {
    if (cardIsSkip) {
      if ((turn = users[0])) {
        whoseTurn = players.at(-2);
      } else if ((turn = players[1])) {
        whoseTurn = players.at(-1);
      } else whoseTurn = players[playerIndex + 2];
    } else if ((turn = players[0])) {
      whoseTurn = players.at(-1);
    } else whoseTurn = players[playerIndex - 1];
  }
  return whoseTurn;
}
