import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { auth } from "../../firebase.config";
import { useUserContext } from "../context";
import { useGameContext } from "../context/GameContext";
import checkForWin from "../functions/checkForWin";
import nextTurn from "../functions/nextTurn";

//TODO: draw card
//TODO: force draw 2/4
//TODO: handle wild
//TODO: check for win

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
        setPlayers([...waitingUsers]);
        waitingUsers = [];
    };

    const playersToWaiting = () => {
        waitingUsers = [...players];
        waitingUsers.forEach(() => (players.hand = []));
        setPlayers([]);
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
        socketRef.current = io("http://localhost:8080", {
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

        socketRef.current.on("draw card", () => {
            let deck = playDeck;
            let card = deck.pop();
            players[turn].hand.push(card);
            setPlayDeck(deck);
            setPlayers(players);
        });

        socketRef.current.on(
            "end turn",
            ({ players, discardDeck, activeCard, isReverse, turn }) => {
                if (checkForWin(players, turn)) {
                    endGame(players);
                }
                setDiscardDeck(discardDeck);
                setActiveCard(activeCard);
                setIsReverse(isReverse);
                setPlayers(players);
                setTurn(nextTurn(turn, isReverse, players, activeCard));
            }
        );

        socketRef.current.on("user connect", ({ username, uid }) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
            onConnect(username, uid);
        });

        socketRef.current.on("start game", ({ players, playDeck, activeCard }) => {
            console.log(players);
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

        socketRef.current.on("end game", () => {
            //search for is host in array
            if (!players.find(players.isHost === true)) {
                setMessages((curr) => [
                    ...curr,
                    {
                        body: "Game has ended due to host disconnect, all players will now return to waiting area",
                    },
                ]);
                playersToWaiting();
                initialState();
            } else if ("stalemate") {
                setMessages((curr) => [
                    ...curr,
                    {
                        body: "Stalemate. Get better.",
                    },
                ]);
                playersToWaiting();
                initialState();
            }
            //send game winner message
            setMessages((curr) => [
                ...curr,
                {
                    body: `${players[turn].name} has won!`,
                },
            ]);
            playersToWaiting();
            initialState();
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

    function endGame() {
        socketRef.current.emit("end game");
    }

    function endTurn(players, discardDeck, activeCard, isReverse, turn, playedWild) {
        socketRef.current.emit("end turn", {
            players,
            discardDeck,
            activeCard,
            isReverse,
            turn,
            playedWild,
        });
    }

    function drawCard() {
        //TODO pass in value
        socketRef.current.emit("draw card", players);
    }

    return { messages, sendMessage, endGame, endTurn, drawCard, startGame };
};

export default useSocketHook;
