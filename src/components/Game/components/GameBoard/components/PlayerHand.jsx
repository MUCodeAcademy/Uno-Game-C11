import React, { useEffect, useRef, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";
import {
    removeCardFromHand,
    validatePlayedCard,
    playCard,
    shuffleDeck,
    CardValue,
    CardColor,
} from "../../../../../shared/functions";
import ChooseColorPrompt from "./ChooseColorPrompt";
import { auth } from "../../../../../firebase.config";
import { Button } from "../../../../../shared/styled/components/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";

function PlayerHand({ endTurn, drawCard, endGame }) {
    const {
        players,
        activeCard,
        setActiveCard,
        isGameActive,
        playDeck,
        discardDeck,
        setReshuffling,
        turn,
    } = useGameContext();
    const [playedWild, setPlayedWild] = useState(false);
    //! this wasn't working because playerhand is rerendering and setting these back to undefined
    const newPlayers = useRef();
    const newDiscardDeck = useRef();
    const newIsReverse = useRef();
    const newActiveCard = useRef();

    let playerIndex = players.findIndex((p) => p.uid === auth.currentUser.uid);
    function handleDrawClick() {
        //only allow draw/playcard when it's current player's turn (and they aren't currently picking a color after playing a wild)
        if (turn === playerIndex && !playedWild) {
            drawCard(players, playDeck, turn);
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
                newPlayers.current = removeCardFromHand(players, playerIndex, card);
                newActiveCard.current = card;
                newIsReverse.current = card.value === CardValue.Reverse;
                newDiscardDeck.current = [...discardDeck, card];
                setPlayedWild(card.color === CardColor.Black);
                //if wild played, wait for color picker prompt before ending turn
                if (card.color !== CardColor.Black) {
                    endTurn(
                        newPlayers.current,
                        newDiscardDeck.current,
                        newActiveCard.current,
                        newIsReverse.current,
                        turn,
                        playDeck
                    );
                }
            }
        }
    }

    useEffect(() => {
        //TODO build shuffle socket and then implement here or close to here or whatever you feel like doing
        if (playDeck?.length === 0) {
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
    }, [playDeck?.length]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
            }}
        >
            {playedWild && (
                <ChooseColorPrompt
                    setPlayedWild={setPlayedWild}
                    setActiveCard={setActiveCard}
                    endTurn={endTurn}
                    newPlayers={newPlayers}
                    newDiscardDeck={newDiscardDeck}
                    newActiveCard={newActiveCard}
                    newIsReverse={newIsReverse}
                    turn={turn}
                />
            )}
            <div style={{ display: "flex" }}>
                {isGameActive &&
                    players[playerIndex] &&
                    players[playerIndex].hand.map((card, idx) => (
                        <div
                            style={{
                                height: "50px",
                                width: "50px",
                                margin: "0px 0px 0px 50px",
                            }}
                            value={card}
                            onClick={() => handlePlayCardClick(card)}
                            key={idx}
                        >
                            <img
                                src={require(`./cards/${card.color}_${card.value}.png`)}
                                style={{ maxHeight: "200px" }}
                            ></img>
                        </div>
                    ))}
            </div>
            <div style={{ margin: "150px 0px 0px 0px" }}>
                {turn === playerIndex && (
                    <h4 style={{ color: theme.palette.secondary.main }}>It's your turn!</h4>
                )}
            </div>
            <div>
                <Button onClick={() => handleDrawClick()}>Draw Card</Button>
            </div>
        </div>
    );
}

export default PlayerHand;
