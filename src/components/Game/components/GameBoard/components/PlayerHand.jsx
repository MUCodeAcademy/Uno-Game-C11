import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";

import {
    removeCardFromHand,
    validatePlayedCard,
    shuffleDeck,
    CardValue,
    CardColor,
    buildDeck,
} from "../../../../../shared/functions";
import ChooseColorPrompt from "./ChooseColorPrompt";
import { auth } from "../../../../../firebase.config";
import Button from "@mui/material/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";
import Card from "./Card";
import useHotkey from "../../../../../shared/hooks/useHotkey";

function PlayerHand({ endTurn, drawCard, forceDisconnect }) {
    const {
        players,
        setPlayers,
        activeCard,
        setActiveCard,
        isGameActive,
        playDeck,
        discardDeck,
        isReverse,
        waitingUsers,
        turn,
    } = useGameContext();

    const [playedWild, setPlayedWild] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    useEffect(() => {
        setHasDrawn(false);
    }, [turn]);

    let playerIndex = players.findIndex((p) => p.uid === auth.currentUser.uid);
    const isPlayersTurn = useMemo(() => {
        return turn === playerIndex;
    }, [turn, players]);

    const mostRecent = useMemo(() => {
        if (playerIndex === -1) return;
        let lastIdx =
            players[playerIndex].hand.length > 0 ? players[playerIndex].hand.length - 1 : 0;
        return players[playerIndex].hand[lastIdx];
    }, [players, playerIndex]);

    const isWaiting = useMemo(() => {
        return waitingUsers.some((u) => u.uid === auth.currentUser?.uid);
    }, [waitingUsers]);

    //IDLE TIMEOUT
    const [countdown, setCountdown] = useState(60);
    function resetCountdown() {
        setCountdown(60);
    }
    useEffect(() => {
        let interval = null;
        if (countdown <= 0) {
            forceDisconnect();
            return;
        }
        if (isPlayersTurn) {
            interval = setInterval(() => {
                setCountdown((countdown) => countdown - 1);
            }, 1000);
        } else if (!isPlayersTurn && countdown === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlayersTurn, countdown]);

    const newPlayers = useRef(players);
    const newDiscardDeck = useRef(discardDeck);
    const newIsReverse = useRef(isReverse);
    const newActiveCard = useRef(activeCard);

    //cheat code
    const sequence = ["i", "d", "d", "q", "d"];
    const sequence2 = ["i", "d", "k", "f", "a"];
    const [godMode, setGodMode] = useState(false);
    const [idkfa, setIDKFA] = useState(false);
    useHotkey(sequence, () => setGodMode(true));
    useHotkey(sequence2, () => setIDKFA(true));
    useEffect(() => {
        if (godMode) {
            setGodMode(false);
            let newp = [...players];
            newp[playerIndex].hand = [activeCard];
            setPlayers(newp);
        }
        if (idkfa) {
            setIDKFA(false);
            let newp = [...players];
            for (let i = 0; i < newp.length; i++) {
                if (i !== playerIndex) {
                    let cardsToAdd = shuffleDeck(buildDeck());
                    cardsToAdd.forEach((c) => newp[i].hand.push(c));
                    // newp[i].hand.push(shuffleDeck(buildDeck()));
                }
            }
            endTurn(
                newp,
                newDiscardDeck.current,
                newActiveCard.current,
                newIsReverse.current,
                turn,
                playDeck
            );
        }
    }, [godMode, idkfa]);

    function handleDrawClick() {
        //only allow draw/playcard when it's current player's turn (and they aren't currently picking a color after playing a wild)
        if (isPlayersTurn && !playedWild) {
            setHasDrawn(true);
            resetCountdown();
            drawCard(players, playDeck, turn, 1, discardDeck);
        }
    }

    function handlePlayCardClick(card) {
        if (isPlayersTurn && !playedWild) {
            if (validatePlayedCard(card, activeCard)) {
                newPlayers.current = removeCardFromHand(players, playerIndex, card);
                newActiveCard.current = card;
                newIsReverse.current =
                    card.value === CardValue.Reverse ? !isReverse : isReverse;
                newDiscardDeck.current = discardDeck;
                setPlayedWild(card.color === CardColor.Black);
                //if wild played, wait for color picker prompt before ending turn
                if (card.color !== CardColor.Black) {
                    resetCountdown();
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
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
            }}
        >
            <div style={{ height: "50px", marginTop: "5px" }}>
                {playedWild && (
                    <ChooseColorPrompt
                        resetCountdown={resetCountdown}
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
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    margin: "5px",
                    height: "165px",
                    position: "relative",
                    overflowX: "scroll",
                    alignItems: "center",
                }}
            >
                <div style={{ margin: "auto", display: "flex" }}>
                    {isGameActive &&
                        players[playerIndex] &&
                        [...players[playerIndex].hand]
                            .sort((a, b) => {
                                if (a.color === b.color) {
                                    if (a.value === b.value) return 0;
                                    return a.value > b.value ? 1 : -1;
                                }
                                if (a.color === b.color) {
                                    return 0;
                                }
                                return a.color > b.color ? 1 : -1;
                            })
                            .map((card, idx) => (
                                <Card
                                    recentCard={card === mostRecent}
                                    hasDrawn={hasDrawn}
                                    key={idx}
                                    isTurn={isPlayersTurn}
                                    card={card}
                                    handlePlayCardClick={handlePlayCardClick}
                                />
                            ))}
                </div>
            </div>
            <div style={{ minHeight: "48px", textAlign: "center" }}>
                {isPlayersTurn && (
                    <>
                        <h4 style={{ color: theme.palette.secondary.main, margin: "3px" }}>
                            It's your turn!
                        </h4>
                        <h4 style={{ color: theme.palette.secondary.main, margin: "3px" }}>
                            {countdown} seconds to draw or play
                        </h4>
                    </>
                )}
            </div>

            <div>
                {!isWaiting && (
                    <Button
                        fullWidth
                        disabled={!isPlayersTurn}
                        variant="contained"
                        color="primary"
                        onClick={handleDrawClick}
                    >
                        Draw Card
                    </Button>
                )}
            </div>
        </div>
    );
}

export default PlayerHand;
