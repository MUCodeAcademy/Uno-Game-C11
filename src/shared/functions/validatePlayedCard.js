import { CardColor } from "./cardEnums";

export function validatePlayedCard(playedCard, activeCard) {
    let allow = false;
    //if wild, allow
    if (playedCard.color === CardColor.Black) {
        allow = true;
    } else {
        //if color matches, allow
        if (playedCard.color === activeCard.color) {
            allow = true;
        } else {
            //if color doesn't match but value does, allow
            if (playedCard.value === activeCard.value) {
                allow = true;
            }
        }
    }
    return allow;
}