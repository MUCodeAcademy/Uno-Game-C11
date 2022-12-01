import { CardColor, CardValue } from "./cardEnums";

function playCard(clickedCard, gameCard) {
    let reverseDirection = false;
    let skipTurn = false;
    let gameColor = gameCard.color;
    let forceDrawCards = { draw: false, amount: 0 };
    let playedWild = false;

    //assuming validatePlayedCard has already been run and is true (allowed)

    if (clickedCard.color === CardColor.Black) {
        if (clickedCard.value === CardValue.Wild) {
            playedWild = true;
        } else {
            //card is wild + 4
            playedWild = true;
            skipTurn = true;
            forceDrawCards.draw = true;
            forceDrawCards.amount = 4;
        }
    } else {
        if (clickedCard.color === gameCard.color) {
            if (clickedCard.value === CardValue.Skip) {
                skipTurn = true;
            } else if (clickedCard.value === CardValue.Reverse) {
                reverseDirection = true;
            } else if (clickedCard.value === CardValue.DrawTwo) {
                forceDrawCards.draw = true;
                forceDrawCards.amount = 2;
                skipTurn = true;
            }
        }
        //if color doesn't match, val matches (already validated)
        else {
            //it's a number card, change game color
            gameColor = clickedCard.color;
        }
    }

    return { reverseDirection, skipTurn, gameColor, forceDrawCards, playedWild };
}

export default playCard;
