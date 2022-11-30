import { CardColor, CardValue } from "./cardEnums";

export default function playerTurn(players, turn, card, reverseDirection) {
    let playerIndex = players.indexOf(turn);
    let whoseTurn;

    if (reverseDirection === false) {
        if (card.value === CardValue.Skip || card.value === CardValue.DrawTwo) {
            if ((turn = players.at(-1))) {
                whoseTurn = players[1];
            } else if ((turn = users.at(-2))) {
                whoseTurn = players[0];
            } else return (whoseTurn = players[playerIndex + 2]);
        } else if ((turn = players.at(-1))) {
            whoseTurn = players[0];
        } else whoseTurn = players[playerIndex + 1];
    } else {
        if (card.value === CardValue.Skip || card.value === CardValue.DrawTwo) {
            if ((turn = players[0])) {
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
