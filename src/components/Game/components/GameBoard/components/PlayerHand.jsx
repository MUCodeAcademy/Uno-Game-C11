import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";

import {
    removeCardFromHand,
    validatePlayedCard,
    playCard,
    shuffleDeck,
    CardValue,
    CardColor,
    reshuffleDeck,
} from "../../../../../shared/functions";
import ChooseColorPrompt from "./ChooseColorPrompt";
import { auth } from "../../../../../firebase.config";
import { Button } from "../../../../../shared/styled/components/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";
import Card from "./Card";

function PlayerHand({ endTurn, drawCard, endGame, reshuffle }) {
    const {
        players,
        activeCard,
        setActiveCard,
        isGameActive,
        playDeck,
        discardDeck,
        setShuffling,
        isReverse,
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
            drawCard(players, playDeck, turn, 1);
        }
        // const { players: newPlayers, playDeck: newPlayDeck } = drawCard(
        //     players,
        //     playerIndex,
        //     playDeck
        // );
        // setPlayDeck(newPlayDeck);
        // setPlayers(newPlayers);
    }

    const isPlayersTurn = useMemo(() => {
        return turn === playerIndex;
    });
    function handlePlayCardClick(card) {
        console.log(card);
        if (turn === playerIndex && !playedWild) {
            if (validatePlayedCard(card, activeCard)) {
                newPlayers.current = removeCardFromHand(players, playerIndex, card);
                newActiveCard.current = card;
                newIsReverse.current =
                    card.value === CardValue.Reverse ? !isReverse : isReverse;
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
            } else {
                //TODO: handle case when there is no discard deck (meaning all players have drawn all available cards)
                endTurn(players, discardDeck, activeCard, isReverse, turn, playDeck);
                // endGame(false, "Stalemate");
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
    console.log(turn);

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
                    playDeck={playDeck}
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
                        <Card
                            key={idx}
                            isTurn={isPlayersTurn}
                            card={card}
                            handlePlayCardClick={handlePlayCardClick}
                        />
                    ))}
            </div>
            <div style={{ margin: "150px 0px 0px 0px" }}>
                {isPlayersTurn && (
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
