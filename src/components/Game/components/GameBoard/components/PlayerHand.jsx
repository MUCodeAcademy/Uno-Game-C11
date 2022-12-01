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
    const {
        setPlayers,
        players,
        activeCard,
        setActiveCard,
        activeGame,
        playDeck,
        setPlayDeck,
        discardDeck,
        setDiscardDeck,
        reshuffling,
        setReshuffling,
    } = useGameContext();
    let playerIndex = 0; //this will be player identifier from socket
    let reverseDirection, skipTurn, gameColor, forceDrawCards;
    const [playedWild, setPlayedWild] = useState(false);
    // player = players.indexOf(socketId)

    //TODO: only allow draw/playcard when it's current player's turn
    //TODO: make sure player can't draw/playcard during color picking
    function handleDrawClick() {
        //TODO add in draw card socket
        console.log(playDeck.length);
        const { players: newPlayers, playDeck: newPlayDeck } = drawCard(
            players,
            playerIndex,
            playDeck
        );
        setPlayDeck(newPlayDeck);
        setPlayers(newPlayers);
    }

    function handleCardClick(card) {
        //TODO integrate play card socket
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
                //TODO end turn socket
                endTurn();
            }
        }
    }

    useEffect(() => {
        //TODO build shuffle socket and then implement here or close to here or whatever you feel like doing
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

    return (
        <>
            <button onClick={() => handleDrawClick()}>Draw Card</button>
            {playedWild && (
                <ChooseColorPrompt
                    setPlayedWild={setPlayedWild}
                    setActiveCard={setActiveCard}
                />
            )}
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
                {activeGame &&
                    players[playerIndex] &&
                    players[playerIndex].hand.map((card, idx) => (
                        <div
                            style={{
                                height: "50px",
                                width: "50px",
                                border: "1px solid black",
                            }}
                            value={card}
                            onClick={() => handleCardClick(card)}
                            key={idx}
                        >
                            <div>{card.color}</div>
                            <div>{card.value}</div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default PlayerHand;
