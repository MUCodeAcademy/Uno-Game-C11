import { act } from "react-dom/test-utils";
import { CardValue } from "./cardEnums";

export function nextTurn(turn, isReverse, players, activeCard) {
    let change = 1;
    if (activeCard.value === CardValue.Skip || activeCard.value === CardValue.WildDrawFour || activeCard.value === CardValue.DrawTwo) {
        change = 2;
    }
    change = change * isReverse ? -1 : 1;
    if (turn + change >= 0 && turn + change < players.length) {
        return turn + change;
    }
    if (turn + change < 0) {
        return turn + change + players.length;
    }
    return turn + change - players.length;
}

export default nextTurn;
