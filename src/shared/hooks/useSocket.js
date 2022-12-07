import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { auth } from "../../firebase.config";
import { useGameContext } from "../context/GameContext";
import { CardColor, checkForEndGame, shuffleDeck } from "../functions";

import { CardValue } from "../functions";
import nextTurn from "../functions/nextTurn";

//TODO: check for win

const useSocketHook = (roomID, username) => {
    const {
        setIsHost,
        setIsGameActive,
        setActiveCard,
        players,
        setPlayers,
        activeCard,
        setPlayDeck,
        setShuffling,
        setDiscardDeck,
        setWaitingUsers,
        setIsReverse,
        setTurn,
    } = useGameContext();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [hostuid, setHostuid] = useState();
    const navigate = useNavigate();

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

    const onConnect = (newPlayerName, newPlayerUID, active) => {
        let player = { name: "", uid: "", hand: [], isHost: false };
        player.name = newPlayerName;
        player.uid = newPlayerUID;

        if (active === false) {
            setPlayers((curr) => [...curr, player]);
        } else {
            setWaitingUsers((curr) => [...curr, player])
        }
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
        socketRef.current = io("localhost:8080", {
            query: {
                username,
                roomID,
                uid: auth.currentUser?.uid,
            },
        });

        socketRef.current.on("host check", ({ roomCount, uid }) => {
            if (roomCount === null) {
                setIsHost(true);
                socketRef.current.emit("sendhostuid", uid);
            }
        });

        socketRef.current.on("game active", (gameActive) => {
            setIsGameActive(gameActive);
        });

        socketRef.current.on("draw card", ({ players, playDeck, turn, draws, activeCard, discardDeck, isReverse }) => {
            let cards = playDeck.splice(0, draws);
            setPlayDeck(playDeck);
            setDiscardDeck(discardDeck);
            players[turn].hand = [...players[turn].hand, ...cards];
            setPlayers(players);
        });

        socketRef.current.on("end turn", ({ players, discardDeck, newActiveCard, activeCard, isReverse, turn, playDeck }) => {
            const message = checkForEndGame(players, playDeck, discardDeck);
            //message will be null if end game conditions are not met

            if (message) {
                endGame(message);
                return;
            }

            if (activeCard.value === CardValue.Wild || activeCard.value === CardValue.WildDrawFour) {
                activeCard.color = CardColor.Black;
            }
            setDiscardDeck([...discardDeck, activeCard]);
            setActiveCard(newActiveCard);
            setIsReverse(isReverse);
            setPlayers(players);
            const { next, skipped } = nextTurn(turn, isReverse, players, newActiveCard);
            if (newActiveCard.value === CardValue.DrawTwo || newActiveCard.value === CardValue.WildDrawFour || newActiveCard.value === CardValue.Skip) {
                setTurn(skipped);
            } else {
                setTurn(next);
            }
            if (newActiveCard.value === CardValue.DrawTwo || newActiveCard.value === CardValue.WildDrawFour) {
                const draw = newActiveCard.value === CardValue.DrawTwo ? 2 : 4;
                drawCard(players, playDeck, next, draw, isReverse);
            }
        });
        socketRef.current.on("user connect", ({ username, uid, active }) => {
            setMessages((curr) => [...curr, { body: `${username} has connected` }]);
            onConnect(username, uid, active);
        });

        socketRef.current.on("start game", ({ players, playDeck, activeCard }) => {
            setPlayers(players);
            setPlayDeck(playDeck);
            setActiveCard(activeCard);
            setDiscardDeck([]);
            setTurn(0);
            setIsGameActive(true);
            setWaitingUsers([])
            //! onNewGame();
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });
        socketRef.current.on("user disconnect", ({ username, uid }) => {
            setWaitingUsers((curr) => {
                if (curr.findIndex((p) => p.uid === uid) !== -1) {
                    let playerIndex = curr.findIndex((p) => p.uid === uid);
                    curr.splice(playerIndex, 1);
                }
                return [...curr];
            })
            setPlayers((curr) => {
                //Check for player to remove
                if (curr.findIndex((p) => p.uid === uid) !== -1) {
                    let playerIndex = curr.findIndex((p) => p.uid === uid);
                    let playerToRemove = curr[playerIndex];
                    curr.splice(playerIndex, 1);
                    console.log(curr);
                    // Get their cards
                    // Update turn order
                    setTurn((currTurn) => (currTurn >= playerIndex ? currTurn - 1 : currTurn));
                    setDiscardDeck((curr) => [...curr, ...playerToRemove.hand]);
                }

                return [...curr];
            });
            setMessages((curr) => [...curr, { body: `${username} has disconnected` }]);
            // onDisconnect();
        });
        socketRef.current.on("host disconnected", () => {
            navigate("/");
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

    function endTurn(players, discardDeck, newActiveCard, isReverse, turn, playDeck) {
        socketRef.current.emit("end turn", {
            activeCard,
            players,
            discardDeck,
            newActiveCard,
            isReverse,
            turn,
            playDeck,
        });
    }

    function drawCard(players, playDeck, turn, draws, activeCard, discardDeck, isReverse) {
        if (playDeck.length + discardDeck.length < draws) {
            endGame("Stalemate, not enough cards to draw.");
            return;
        }

        if (playDeck.length < draws) {
            const deck = shuffleDeck(discardDeck);
            playDeck = [...playDeck, ...deck];
            discardDeck = [];
        }
        socketRef.current.emit("draw card", {
            players,
            playDeck,
            turn,
            draws,
            activeCard,
            discardDeck,
            isReverse,
        });
    }

    return {
        messages,
        sendMessage,
        endGame,
        endTurn,
        drawCard,
        startGame,
    };
};

export default useSocketHook;
