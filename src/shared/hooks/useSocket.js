import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useGameContext } from "../context/GameContext";

const useSocketHook = (roomID, username) => {
    const socketRef = useRef(null);
    //TODO create message context? could leave as local state to each game socket
    const [messages, setMessages] = useState([]);
    //TODO import player context and modify relevent information
    const { players, playDeck, activeGame, activeCard, discardDeck } = useGameContext();

    let activePlayers = [];
    let waitingPlayers = [];
    let timeOut;
    let turn = 0;

    const newGame = () => {
        activePlayers.push(players);
        activePlayers.push(waitingPlayers);
        turn = Math.random(Math.floor() * activePlayers.length);
        activePlayers[turn].emit(isTurn, "Your turn!");
    };
    const nextTurn = () => {
        turn++;
        activePlayers[turn].emit(isTurn, "Your turn!");
    };
    const reverse = () => {
        activePlayers.reverse();
        nextTurn();
        activePlayers[turn].emit(isTurn, "Your turn!");
    };
    const skip = () => {
        nextTurn();
        nextTurn();
    };

    useEffect(() => {
        socketRef.current = io("http://localhost:8080", {
            query: {
                username,
                roomID,
            },
        });

        socketRef.current.on("user join", (username) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });

        socketRef.current.on("user left", (username) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
        });

        socketRef.current.on("start game", () => {
            setStarted(true);
        });

        socketRef.current.on("send cards", (cards) => {
            setCards(cards);
        });

        socketRef.current.on("end trun", () => {
            //don't know yet
        });

        return () => socketRef.current?.disconnect();
    }, [roomID, username]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body });
    }

    function sendStart() {
        socketRef.current.emit("start game");
    }

    function endTurn() {
        socketRef.current.emit("end turn");
    }

    function sendCards(cards) {
        socketRef.current.emit("send cards", { cards });
    }

    return { messages, sendMessage, started, sendStart, endTurn, sendCards, cards };
};

export default useSocketHook;
