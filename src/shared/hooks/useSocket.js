import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useUserContext } from "../context";
import { useGameContext } from "../context/GameContext";

const useSocketHook = (roomID, username) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const { user } = useUserContext();
    const { players, setPlayers, setDiscardDeck, setActiveGame, activeGame } =
        useGameContext();

    const waitingUser = [];

    const waitingToPlayers = () => {
        let usersToMove = [];
        for (let i = 0; i <= waitingUser.length; i++) {
            let playerToAdd = waitingUser.pop();
            usersToMove.push(playerToAdd);
            setPlayers(usersToMove);
        }
    };

    const playersToWaiting = () => {
        for (let i = 0; i <= players.length; i++) {
            let playerToAdd = players.pop();
            waitingUser.push(playerToAdd);
            setPlayers();
        }
    };

    const onConnect = () => {
        let player = { name: "", uid: "", hand: [], isUser: false };
        player.name = user.displayname;
        player.uid = user.uid;
        //! check for host function here
        waitingUser.push(player);
    };

    function onNewGame() {
        waitingToPlayers();
        setActiveGame(true);
    }

    const onDisconnect = (player) => {
        if (player.isHost) {
            endGame();
        }
        let cardsToDiscard = [];
        for (let i = 0; i <= player.hand.length; i++) {
            let card = player.hand.pop();
            cardsToDiscard.push(card);
            setDiscardDeck(cardsToDiscard);
        }
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
            isHost();
            waitingUser.push();
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
