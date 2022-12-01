import React, { useEffect, useMemo, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";
import { CardColor } from "../../../../../shared/functions/cardEnums";
import endTurn from "../../../../../shared/functions/endTurn";
import removeCardFromHand from "../../../../../shared/functions/removeCardFromHand";
import ChooseColorPrompt from "./ChooseColorPrompt";
import validatePlayedCard from "../../../../../shared/functions/validatePlayedCard";
import playCard from "../../../../../shared/functions/playCard";
import drawCard from "../../../../../shared/functions/drawCard";
import checkForReshuffle from "../../../../../shared/functions/checkForReshuffle";
import needsReshuffle from "../../../../../shared/functions/checkForReshuffle";
import shuffleDeck from "../../../../../shared/functions/shuffleDeck";

function PlayerHand() {
    const { setPlayers, players, activeCard, setActiveCard, activeGame, playDeck, setPlayDeck, discardDeck, setDiscardDeck, reshuffling, setReshuffling } = useGameContext();
    let playerIndex = 0; //this will be player identifier from socket
    let reverseDirection, skipTurn, gameColor, forceDrawCards;
    const [playedWild, setPlayedWild] = useState(false);
    // player = players.indexOf(socketId)

    //TODO: only allow draw/playcard when it's current player's turn
    //TODO: make sure player can't draw/playcard during color picking
    function handleDrawClick() {
        console.log(playDeck.length);
        const { players: newPlayers, playDeck: newPlayDeck } = drawCard(players, playerIndex, playDeck);
        setPlayDeck(newPlayDeck);
        setPlayers(newPlayers);
    }

    function handleCardClick(card) {
        // debugger;
        if (validatePlayedCard(card, activeCard)) {
            let rtn = playCard(card, activeCard);
            reverseDirection = rtn.reverseDirection;
            skipTurn = rtn.skipTurn;
            gameColor = rtn.gameColor;
            forceDrawCards = rtn.forceDrawCards;
            setPlayedWild(rtn.playedWild);
            setActiveCard(card);
            //TODO: handle when user is prompted to change color
            //change activeCard state's COLOR attribute to gameColor
            setPlayers(removeCardFromHand(players, playerIndex, card));
            setDiscardDeck((curr) => [...curr, card]);
            if (!playedWild) {
                endTurn();
            }
        }
    }

    useEffect(() => {
        if (playDeck.length === 0) {
            if (discardDeck.length > 0) {
                setReshuffling(true);
                //if host
                if (playerIndex === 0) {
                    setPlayDeck(shuffleDeck(discardDeck));
                    setDiscardDeck([]);
                    setReshuffling(false);
                }
                //if not host
                else {
                    //???
                }
            } else {
                //TODO: handle case when there is no discard deck (meaning all players have drawn all available cards)
            }
        }
    }, [playDeck.length]);

    //statements for sending socket messages determined by return of playCard
    // useEffect(() => {
    //     if (reverseDirection) {
    //         //send reverseDirection socket message
    //         //send endTurn()
    //     }
    //     if (skipTurn) {
    //         //send endTurn() - end player turn
    //         //send endTurn() - end target player turn
    //     }
    //     if (playedWild) {
    //         //send {player} played {wild , wildPlusFour}
    //     }
    //     if (forceDrawCards.draw) {
    //         //send endTurn() - end player turn
    //         //send forceCards.amount draw() - force target player to draw
    //         //send endTurn() - end target player turn
    //     }
    // }, [reverseDirection, skipTurn, playedWild, forceDrawCards.draw]);

    return (
        <>
            <button onClick={() => handleDrawClick()}>Draw Card</button>
            {playedWild && <ChooseColorPrompt setPlayedWild={setPlayedWild} setActiveCard={setActiveCard} />}
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
                {activeGame &&
                    players[playerIndex] &&
                    players[playerIndex].hand.map((card, idx) => (
                        <div style={{ height: "50px", width: "50px", border: "1px solid black" }} value={card} onClick={() => handleCardClick(card)} key={idx}>
                            <div>{card.color}</div>
                            <div>{card.value}</div>
                        </div>
                    ))}
            </div>
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
