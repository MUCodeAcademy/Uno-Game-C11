import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { auth } from "../../firebase.config";
import { useUserContext } from "../context";
import { useGameContext } from "../context/GameContext";

const useSocketHook = (roomID, username) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const { user } = useUserContext();

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

    let waitingUsers = [];


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
        player.name = auth.currentUser?.displayName;
        player.uid = auth.currentUser?.uid;
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
        })

        socketRef.current.on("host check", roomCount => {
            console.log("jwrgv");
            console.log(roomCount);
            if (roomCount == null) {
                setIsHost(true);
                players[0].isHost = true
            }
        });

        socketRef.current.on("game active", (gameActive) => {
            setIsGameActive(gameActive);
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

        socketRef.current.on("user connect", ({ username }) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
            onConnect();
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });

        socketRef.current.on("user disconnect", ({ username }) => {
            setMessages((curr) => [...curr, { body: `${username} has disconnected` }]);
            onDisconnect();
        });

        socketRef.current.on("start game", () => {
            onNewGame();
            setIsGameActive(true)
        });

        return () => socketRef.current?.disconnect();
    }, [roomID, username, isGameActive]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body });
    }

    function sendStart() {
        socketRef.current.emit("start game");
    }

    return { messages, sendMessage, sendStart };
};

export default useSocketHook;
