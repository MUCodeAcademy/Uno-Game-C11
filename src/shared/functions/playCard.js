// import { CardColor, CardValue } from "./cardEnums";

// export function playCard(playedCard, activeCard) {
//     let reverseDirection = false;
//     let skipTurn = false;
//     let playedWild = false;

//     //assuming validatePlayedCard has already been run and is true (allowed)

//     if (playedCard.color === CardColor.Black) {
//         if (playedCard.value === CardValue.Wild) {
//             playedWild = true;
//         } else {
//             //card is wild + 4
//             playedWild = true;
//             skipTurn = true;
//         }
//     } else {
//         if (playedCard.color === activeCard.color) {
//             if (playedCard.value === CardValue.Skip) {
//                 skipTurn = true;
//             } else if (playedCard.value === CardValue.Reverse) {
//                 reverseDirection = true;
//             } else if (playedCard.value === CardValue.DrawTwo) {
//                 skipTurn = true;
//             }
//         }
//     }

//     return { reverseDirection, playedWild };
// }

// export default playCard;
