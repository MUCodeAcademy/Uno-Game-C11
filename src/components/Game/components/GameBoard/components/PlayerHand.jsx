import React, { useEffect, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";
import { removeCardFromHand, validatePlayedCard, playCard, shuffleDeck, CardValue, CardColor } from "../../../../../shared/functions";

// import removeCardFromHand from "../../../../../shared/functions/removeCardFromHand";
// import validatePlayedCard from "../../../../../shared/functions/validatePlayedCard";
// import playCard from "../../../../../shared/functions/playCard";
// import shuffleDeck from "../../../../../shared/functions/shuffleDeck";
import ChooseColorPrompt from "./ChooseColorPrompt";
import useGameSocketHook from "../../../../../shared/hooks/useGameSockets";
import { useParams } from "react-router-dom";
import { auth } from "../../../../../firebase.config";

function PlayerHand() {
    const { setPlayers, players, activeCard, setActiveCard, activeGame, playDeck, setPlayDeck, discardDeck, setDiscardDeck, reshuffling, setReshuffling, turn, setIsReverse } = useGameContext();
    const { roomID } = useParams();
    const { endTurn, drawCard, endGame } = useGameSocketHook(roomID, auth.currentUser?.displayName);
    const [playedWild, setPlayedWild] = useState(false);

    let playerIndex = players.findIndex((p) => p.uid === auth.currentUser.uid);

    function handleDrawClick() {
        //only allow draw/playcard when it's current player's turn (and they aren't currently picking a color after playing a wild)
        if (turn === playerIndex && !playedWild) {
            drawCard();
        }
        // const { players: newPlayers, playDeck: newPlayDeck } = drawCard(
        //     players,
        //     playerIndex,
        //     playDeck
        // );
        // setPlayDeck(newPlayDeck);
        // setPlayers(newPlayers);
    }

    function handlePlayCardClick(card) {
        if (turn === playerIndex && !playedWild) {
            if (validatePlayedCard(card, activeCard)) {
                //! do we even need playcard function?
                //! card has been validated as a legal play already
                setActiveCard(card);
                setIsReverse(card.value === CardValue.Reverse);
                setPlayedWild(card.color === CardColor.Black);
                setPlayers(removeCardFromHand(players, playerIndex, card));
                setDiscardDeck((curr) => [...curr, card]);
                //if wild played, wait for color picker prompt before ending turn
                if (!card.color === CardColor.Black) {
                    endTurn();
                }
            }
        }
    }

    useEffect(() => {
        //if player turn and a draw card was played, auto draw cards & end turn
        if (turn === playerIndex) {
            if (activeCard.value === CardValue.DrawTwo) {
                drawCard();
                drawCard();
                endTurn();
            }
            if (activeCard.validatePlayedCard === CardValue.WildDrawFour) {
                drawCard();
                drawCard();
                drawCard();
                drawCard();
                endTurn();
            }
        }
    }, [turn]);

    useEffect(() => {
        //TODO build shuffle socket and then implement here or close to here or whatever you feel like doing
        if (playDeck.length === 0) {
            if (discardDeck.length > 0) {
                setReshuffling(true);
                //shuffle needs to
                //  setPlayDeck(shuffleDeck(discardDeck))
                //  setDiscardDeck([])
                //  setReshuffling(false)
            } else {
                //TODO: handle case when there is no discard deck (meaning all players have drawn all available cards)
                endGame(false, "Stalemate");
                //? may want to send either loser or winner
                //? loser:
                // let loser = "";
                // let mostCards = 0;
                // players.forEach((player) => {
                //     if (player.hand.length > mostCards) {
                //         mostCards = player.hand.length;
                //         loser = player.name;
                //     }
                // });
                // endGame(false, `Stalemate: ${loser} had the fewest cards (${mostCards}).`);

                // //? winner:
                // let winner = "";
                // let fewestCards = 108;
                // players.forEach((player) => {
                //     if (player.hand.length < fewestCards) {
                //         fewestCards = player.hand.length;
                //         winner = player.name;
                //     }
                // });
                // endGame(false, `Stalemate: ${winner} had the fewest cards (${fewestCards}).`);
            }
        }
    }, [playDeck.length]);

    return (
        <>
            <button onClick={() => handleDrawClick()}>Draw Card</button>
            {playedWild && <ChooseColorPrompt setPlayedWild={setPlayedWild} setActiveCard={setActiveCard} endTurn={endTurn} />}
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
                            onClick={() => handlePlayCardClick(card)}
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
