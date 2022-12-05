import { CardColor } from "./cardEnums";

export function validatePlayedCard(playedCard, activeCard) {
  console.log(activeCard);
  console.log(playedCard);
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
  console.log(allow);
  return allow;
}
