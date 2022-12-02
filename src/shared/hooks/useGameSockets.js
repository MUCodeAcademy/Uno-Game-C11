import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import newGame from "../functions/newGame";
import nextTurn from "../functions/nextTurn";

const useGameSocketHook = (roomID, username) => {
    const socketRef = useRef(null);
    const {
        setIsHost,
        isHost,
        isGameActive,
        setIsGameActive,
        setActiveCard,
        players,
        setPlayers,
        activeCard,
        playDeck,
        setPlayDeck,
        discardDeck,
        setDiscardDeck,
        isReverse,
        setIsReverse,
        turn,
        setTurn,
    } = useGameContext();
    useEffect(() => {
        socketRef.current = io("http://localhost:8080", {
            query: {
                username,
                roomID,
            },
        });

        socketRef.current.on("host check", (roomCount) => {
            if (roomCount == 0) {
                setIsHost(true);
            }
        });

        socketRef.current.on("game active", (gameActive) => {
            setActiveGame(gameActive);
        });

        socketRef.current.on("draw card", () => {
            let deck = playDeck;
            let card = deck.pop();
            players[turn].hand.push(card);
            setPlayDeck(deck);
            setPlayers(players);
        });

        socketRef.current.on(
            "end trun",
            ({ activeCard, isReverse, players, discardDeck, turn, activeCard }) => {
                setDiscardDeck(discardDeck);
                setActiveCard(activeCard);
                setIsReverse(isReverse);
                setPlayers(players);
                setTurn(nextTurn(turn, isReverse, players, activeCard));
            }
        );

        if (isHost) {
            socketRef.current.emit("game active", isGameActive);
        }

        return () => socketRef.current?.disconnect();
    }, [roomID, username, isHost, activeGame]);

    function endTurn() {
        socketRef.current.emit("end turn", {
            players,
            discardDeck,
            activeCard,
            isReverse,
            turn,
            activeCard,
        });
    }

    function drawCard() {
        socketRef.current.emit("draw card", players);
    }

    return { started, sendStart, endTurn, sendCards, cards, drawCard };
};

export default useGameSocketHook;
