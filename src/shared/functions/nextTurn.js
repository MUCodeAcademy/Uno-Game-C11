export default function nextTurn(turn, isReverse, players) {
    players[turn].isTurn = false;

    if (isReverse) {
        //turn is previous entry in array
        turn = turn - 1;
        //if turn is less than 0 , turn is array length - 1
        if (turn < 0) {
            turn = players.length - 1;
        }
    }
    //turn is next entry in array.
    turn = turn + 1;
    //if turn is greater than the array length - 1, then turn is 0
    if (turn > players.length - 1) {
        turn = 0;
    }

    players[turn].isTurn = true;

    return { turn, players };
}
