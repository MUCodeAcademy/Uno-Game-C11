import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { auth } from "../../firebase.config";
import { useGameContext } from "../context/GameContext";
import { checkForEndGame } from "../functions";

import nextTurn from "../functions/nextTurn";

const useSocketHook = (roomID, username) => {
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
        setShuffling,
        discardDeck,
        setDiscardDeck,
        isReverse,
        setIsReverse,
        turn,
        setTurn,
    } = useGameContext();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [waitingUsers, setWaitingUsers] = useState([]);

    const initialState = () => {
        setIsGameActive(false);
        setPlayDeck([]);
        setDiscardDeck([]);
        setActiveCard(null);
        setIsReverse(false);
        setShuffling(false);
        setTurn(0);
    };

    const waitingToPlayers = () => {
        // setPlayers([...waitingUsers]);
        // waitingUsers = [];
    };

    const playersToWaiting = () => {
        // waitingUsers = [...players];
        // waitingUsers.forEach(() => (players.hand = []));
        // setPlayers([]);
    };

    const onConnect = (newPlayerName, newPlayerUID) => {
        let player = { name: "", uid: "", hand: [], isHost: false };
        player.name = newPlayerName;
        player.uid = newPlayerUID;
        if (waitingUsers.length === 0) {
            player.isHost = true;
        }

        // waitingUsers.push(player);
        setPlayers((curr) => [...curr, player]);
    };

    function onNewGame() {
        waitingToPlayers();
        setTurn(Math.random(Math.floor() * players.length - 1));
        // setIsGameActive(true);
    }

    const onDisconnect = (player) => {
        if (player.isHost) {
            endGame();
        }
        let cardsToDiscard = [...player.hand];
        setDiscardDeck((curr) => [...curr, cardsToDiscard]);
    };

    useEffect(() => {
        socketRef.current = io("10.200.224.166:8080", {
            query: {
                username,
                roomID,
                uid: auth.currentUser?.uid,
            },
        });

        socketRef.current.on("host check", (roomCount) => {
            if (roomCount == null) {
                setIsHost(true);
                // players[0].isHost = true;
            }
        });

        socketRef.current.on("game active", (gameActive) => {
            setIsGameActive(gameActive);
        });

        socketRef.current.on("draw card", ({ players, playDeck, turn, draws }) => {
            let card = playDeck.pop();
            players[turn].hand.push(card);
            setPlayDeck(playDeck);
            setPlayers(players);
            if (draws === "2") {
                let card2 = playDeck.pop();
                players[turn].hand.push(card2);
                setPlayDeck(playDeck);
                setPlayers(players);
            }
        });

        socketRef.current.on("end turn", ({ players, discardDeck, activeCard, isReverse, turn, playDeck }) => {
            const message = checkForEndGame(players, playDeck, discardDeck);
            console.log(message);
            //message will be null if end game conditions are not met
            if (message) {
                endGame(message);
            }
            setDiscardDeck(discardDeck);
            setActiveCard(activeCard);
            setIsReverse(isReverse);
            setPlayers(players);
            let turns = nextTurn(turn, isReverse, players, activeCard);
            setTurn(nextTurn(turn, isReverse, players, activeCard));
            let draw;
            if (activeCard.value === "draw2") {
                draw = "2";
                drawCard(players, playDeck, turns, draw);
            }
        });

        socketRef.current.on("user connect", ({ username, uid }) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
            onConnect(username, uid);
        });

        socketRef.current.on("start game", ({ players, playDeck, activeCard }) => {
            setPlayers(players);
            setPlayDeck(playDeck);
            setActiveCard(activeCard);
            setTurn(0);
            setIsGameActive(true);
            //! onNewGame();
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });

        socketRef.current.on("user disconnect", ({ username }) => {
            setMessages((curr) => [...curr, { body: `${username} has disconnected` }]);
            onDisconnect();
        });

        socketRef.current.on("end game", ({ message }) => {
            setMessages((curr) => [...curr, { body: message }]);
            playersToWaiting();
            initialState();
            setIsGameActive(false);
        });

        return () => socketRef.current?.disconnect();
    }, [roomID, username]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body });
    }

    function startGame(newDeck, newPlayers, gameStartCard) {
        socketRef.current.emit("start game", {
            players: newPlayers,
            playDeck: newDeck,
            activeCard: gameStartCard,
        });
    }

    function endGame(message) {
        socketRef.current.emit("end game", {
            message,
        });
    }

    function endTurn(players, discardDeck, activeCard, isReverse, turn, playDeck, playedWild) {
        socketRef.current.emit("end turn", {
            players,
            discardDeck,
            activeCard,
            isReverse,
            turn,
            playDeck,
            playedWild,
        });
    }

    function drawCard(players, playDeck, turn, draws) {
        socketRef.current.emit("draw card", { players, playDeck, turn, draws });
    }

    return { messages, sendMessage, endGame, endTurn, drawCard, startGame };
};

export default useSocketHook;
