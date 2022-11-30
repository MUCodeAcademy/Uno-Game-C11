import React, { useEffect, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";
import { CardColor } from "../../../../../shared/functions/cardEnums";
import endTurn from "../../../../../shared/functions/endTurn";
import removeCardFromHand from "../../../../../shared/functions/removeCardFromHand";
import ChooseColorPrompt from "./ChooseColorPrompt";
import validatePlayedCard from "../../../../../shared/functions/validatePlayedCard";
import playCard from "../../../../../shared/functions/playCard";

function PlayerHand() {
    const { setPlayers, players, activeCard, setActiveCard } = useGameContext(null);
    let playerIndex = 0; //this will be player identifier from socket
    let reverseDirection, skipTurn, gameColor, forceDrawCards;
    const [playedWild, setPlayedWild] = useState(false);
    // player = players.indexOf(socketId)

    function handleClick(e) {
        let card = e.target.value;
        if (validatePlayedCard(card, activeCard)) {
            let rtn = playCard(card, activeCard);
            reverseDirection = rtn.reverseDirection;
            skipTurn = rtn.skipTurn;
            gameColor = rtn.gameColor;
            forceDrawCards = rtn.forceDrawCards;
            setPlayedWild(rtn.playedWild);
            //change activeCard state's COLOR attribute to gameColor
            setActiveCard((curr) => ({ value: curr.value, color: gameColor }));
            setPlayers(removeCardFromHand(players, playerIndex, card));
            //TODO add played card to discard state
            if (!playedWild) {
                endTurn();
            }
        }
    }

    //statements for sending socket messages determined by return of playCard
    useEffect(() => {
        if (reverseDirection) {
            //send reverseDirection socket message
            //send endTurn()
        }
        if (skipTurn) {
            //send endTurn() - end player turn
            //send endTurn() - end target player turn
        }
        if (playedWild) {
            //send {player} played {wild , wildPlusFour}
        }
        if (forceDrawCards.draw) {
            //send endTurn() - end player turn
            //send forceCards.amount draw() - force target player to draw
            //send endTurn() - end target player turn
        }
    }, [reverseDirection, skipTurn, playedWild, forceDrawCards.draw]);

    return (
        <>
            {playedWild && <ChooseColorPrompt setPlayedWild={setPlayedWild} />}
            {players[playerIndex].hand.map((card, idx) => (
                <div value={card} onClick={(e) => handleClick(e)} key={idx}>
                    <div>{card.color}</div>
                    <div>{card.value}</div>
                </div>
            ))}
        </>
    );
}

export default PlayerHand;

//TODO move this switch into funciton or single useEffect that only runs AFTER a wild card is played and new gameColor is chosen
// switch (gameColor) {
//   case CardColor.Red:
//   //{player} set color to red
//   case CardColor.Yellow:
//   //{player} set color to yellow
//   case CardColor.Green:
//   //{player} set color to green
//   case CardColor.Blue:
//   //{player} set color to blue
//   default:
//       break;
// }
