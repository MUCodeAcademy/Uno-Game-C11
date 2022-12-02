import { CardValue } from "./cardEnums";

export default function nextTurn(turn, isReverse, players, activeCard) {
    if (isReverse) {
        if (activeCard.value === CardValue.Skip) {
            turn = turn - 2;
        }
        turn = turn - 1;
        if (turn < 0) {
            turn = players.length - 1;
        }
    }
    if (activeCard.value === CardValue.Skip) {
        turn = turn + 2;
    }
    turn = turn + 1;
    if (turn > players.length - 1) {
        turn = 0;
    }

    return turn;
}
