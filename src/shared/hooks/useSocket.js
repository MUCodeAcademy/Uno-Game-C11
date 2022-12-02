import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useUserContext } from "../context";
import { useGameContext } from "../context/GameContext";

const useSocketHook = (roomID, username) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const initialState = {
        isGameActive: false,
        playDeck: [],
        discardDeck: [],
        activeCard: {},
        isReverse: false,
        shuffling: false,
        turn: 0,
    };

    const { players, setPlayers, setDiscardDeck, setActiveGame, activeGame } =
        useGameContext();

    const waitingUsers = [];

    const waitingToPlayers = () => {
        setPlayers([...waitingUsers]);
        waitingUsers = [];
    };

    const playersToWaiting = () => {
        waitingUsers = [...players];
        setPlayers([]);
    };

    const onConnect = () => {
        let player = { name: "", uid: "", hand: [], isHost: false };
        player.name = auth.currentuser?.displayname;
        player.uid = auth.currentuser?.uid;
        if (waitingUsers.length === 0) {
            player.isHost = true;
        }
        waitingUsers.push(player);
    };

    function onNewGame() {
        waitingToPlayers();
        setTurn(Math.random(Math.floor() * players.length - 1));
        setActiveGame(true);
    }

    const onDisconnect = (player) => {
        if (player.isHost) {
            endGame();
            // set all game state to initial values
        }
        let cardsToDiscard = [...player.hand];
        setDiscardDeck((curr) => [...curr, cardsToDiscard]);
    };

    useEffect(() => {
        socketRef.current = io("http://localhost:8080", {
            query: {
                username,
                roomID,
            },
        });

        socketRef.current.on("user connect", (username) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
            onConnect();
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });

        socketRef.current.on("user disconnect", (username) => {
            setMessages((curr) => [...curr, { body: `${username} has disconnected` }]);
            onDisconnect();
        });

        socketRef.current.on("start game", () => {
            onNewGame();
        });

        socketRef.current.on("end game", () => {
            playersToWaiting();
            useGameContext(initialState);
        });

        return () => socketRef.current?.disconnect();
    }, [roomID, username]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body });
    }

    function sendStart() {
        socketRef.current.emit("start game");
    }

    function endGame() {
        setMessages((curr) => [
            ...curr,
            { body: "Game has ended, all players will now return to waiting area" },
        ]);
        socketRef.current.emit("end game");
    }

    return { messages, sendMessage, started, sendStart };
};

export default useSocketHook;
