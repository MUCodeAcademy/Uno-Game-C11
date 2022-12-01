import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import newGame from "../functions/newGame";

const useGameSocketHook = (roomID, username) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
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

        socketRef.current.on("end trun", ({ activeCard, isReverse, players, discardDeck }) => {
            setDiscardDeck(discardDeck);
            setActiveCard(activeCard);
            setIsReverse(isReverse);
            setPlayers(players);
            //TODO create turn function
        });

        if (isHost) {
            socketRef.current.emit("game active", isGameActive);
        }

        return () => socketRef.current?.disconnect();
    }, [roomID, username, isHost, activeGame]);

    function endTurn() {
        socketRef.current.emit("end turn", { players, discardDeck, activeCard, isReverse });
    }

    function drawCard() {
        socketRef.current.emit("draw card", players);
    }

    return { started, sendStart, endTurn, sendCards, cards, drawCard };
};

export default useGameSocketHook;
