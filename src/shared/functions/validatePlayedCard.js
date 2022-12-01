import { CardColor } from "./cardEnums";

function validatePlayedCard(playedCard, gameCard) {
    let allow = false;
    //if wild, allow
    if (playedCard.color === CardColor.Black) {
        allow = true;
    } else {
        //if color matches, allow
        if (playedCard.color === gameCard.color) {
            allow = true;
        } else {
            //if color doesn't match but value does, allow
            if ((playedCard.value = gameCard.value)) {
                allow = true;
            }
        }
    }
    return allow;
}

export default validatePlayedCard;
