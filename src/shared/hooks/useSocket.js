import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { auth } from "../../firebase.config";
import { useGameContext } from "../context/GameContext";
import { CardColor, checkForEndGame, shuffleDeck, CardValue, nextTurn } from "../functions";
import { addGamePlayed, updateStats } from "../functions/database";

const useSocketHook = (roomID, username) => {
    const {
        setIsGameActive,
        setActiveCard,
        players,
        setPlayers,
        activeCard,
        setPlayDeck,
        setShuffling,
        setWaitingUsers,
        setDiscardDeck,
        setIsReverse,
        setTurn,
        waitingUsers,
    } = useGameContext();
    const socketRef = useRef(null);
    const devUIDs = [
        "3a8cb4i5fEbeO33OnZvvJ6SvTjU2",
        "u4MqHUMDMdQbG3pGSJuIIKsv5KA2",
        "GbviAKHZ5dVht3YjOfQjdxG7vRL2",
        "lC7f56DqSVgnrvRQgWhznMIjPs83",
        "8P1enWo03vY7KP3xHG9fMd92iWx1",
    ];
    const [messages, setMessages] = useState([]);
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

    const playersToWaiting = () => {
        setWaitingUsers((currWaiting) => {
            setPlayers((currPlayers) => [
                ...currPlayers.map((v) => ({ ...v, hand: [] })),
                ...currWaiting,
            ]);
            return [];
        });
    };

    const onConnect = (name, uid, isHost, isActive) => {
        let player = { name, uid, hand: [], isHost, isDev: false };
        if (devUIDs.includes(uid)) {
            player.isDev = true;
        }
        setIsGameActive(isActive);
        setMessages((curr) => [...curr, { body: `${name} has connected` }]);
        if (isActive) {
            setWaitingUsers((curr) => {
                if (curr.some((u) => u.uid === uid)) {
                    return curr;
                }
                return [...curr, player];
            });
            return;
        }
        setPlayers((curr) => {
            if (curr.some((u) => u.uid === uid)) {
                return curr;
            }
            // setMessages((curr) => [...curr, { body: `${name} has connected` }]);
            return [...curr, player];
        });
    };

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER, {
            query: {
                username,
                roomID,
                uid: auth.currentUser?.uid,
            },
        });

        socketRef.current.on(
            "draw card",
            ({ players, playDeck, turn, draws, activeCard, discardDeck, isReverse }) => {
                let cards = playDeck.splice(0, draws);
                setPlayDeck(playDeck);
                setDiscardDeck(discardDeck);
                players[turn].hand = [...players[turn].hand, ...cards];
                setPlayers(players);
            }
        );

        socketRef.current.on(
            "end turn",
            ({
                players,
                discardDeck,
                newActiveCard,
                activeCard,
                isReverse,
                turn,
                playDeck,
            }) => {
                const message = checkForEndGame(players, playDeck, discardDeck);
                //message will be null if end game conditions are not met
                if (message) {
                    endGame(message, players);
                    return;
                }

                if (
                    activeCard.value === CardValue.Wild ||
                    activeCard.value === CardValue.WildDrawFour
                ) {
                    activeCard.color = CardColor.Black;
                }
                setDiscardDeck([...discardDeck, activeCard]);
                setActiveCard(newActiveCard);
                setIsReverse(isReverse);
                setPlayers(players);
                const { next, skipped } = nextTurn(turn, isReverse, players, newActiveCard);
                if (
                    newActiveCard.value === CardValue.DrawTwo ||
                    newActiveCard.value === CardValue.WildDrawFour ||
                    newActiveCard.value === CardValue.Skip
                ) {
                    setTurn(skipped);
                } else {
                    setTurn(next);
                }
                if (
                    newActiveCard.value === CardValue.DrawTwo ||
                    newActiveCard.value === CardValue.WildDrawFour
                ) {
                    const draw = newActiveCard.value === CardValue.DrawTwo ? 2 : 4;
                    drawCard(
                        players,
                        playDeck,
                        next,
                        draw,
                        newActiveCard,
                        [...discardDeck, activeCard],
                        isReverse
                    );
                }
            }
        );
        socketRef.current.on("user connect", ({ username, uid, isHost, activeGame }) => {
            onConnect(username, uid, isHost, activeGame);
        });

        socketRef.current.on("start game", ({ players, playDeck, activeCard, turn }) => {
            setPlayers(players);
            setPlayDeck(playDeck);
            setActiveCard(activeCard);
            setDiscardDeck([]);
            setIsGameActive(true);
            setTurn(turn);
            setWaitingUsers([]);
        });

        socketRef.current.on("stalemate", ({ players }) => {
            endGame("Stalemate. There are no cards left to be drawn", players);
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });
        socketRef.current.on("user disconnect", ({ username, uid, activeGame }) => {
            if (activeGame) {
                setWaitingUsers((curr) => {
                    if (curr.findIndex((p) => p.uid === uid) !== -1) {
                        let playerIndex = curr.findIndex((p) => p.uid === uid);
                        curr.splice(playerIndex, 1);
                        updateStats(uid, null);
                    }
                    return [...curr];
                });
                return;
            }
            setPlayers((curr) => {
                //Check for player to remove
                let playerIndex = curr.findIndex((p) => p.uid === uid);
                if (playerIndex === -1) {
                    return curr;
                }
                let playerToRemove = curr[playerIndex];
                curr.splice(playerIndex, 1);
                // Get their cards
                // Update turn order
                if (playerToRemove.isHost) {
                    curr[0].isHost = true;
                }
                setTurn((currTurn) => (currTurn >= playerIndex ? currTurn - 1 : currTurn));
                setDiscardDeck((curr) => [...curr, ...playerToRemove.hand]);
                return [...curr];
            });
            setMessages((curr) => [...curr, { body: `${username} has disconnected` }]);
            // onDisconnect();
        });

        socketRef.current.on("end game", ({ message }) => {
            if (message === "Stalemate, not enough cards to draw.") {
                updateStats(auth.currentUser?.uid, null);
            }
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
        let firstDev = newPlayers.findIndex((d) => devUIDs.includes(newPlayers.uid));
        let turn = firstDev >= 0 ? firstDev : Math.floor(Math.random() * newPlayers.length);
        addGamePlayed(auth.currentUser?.uid);
        socketRef.current.emit("start game", {
            players: newPlayers,
            playDeck: newDeck,
            activeCard: gameStartCard,
            turn,
        });
    }

    function endGame(message, players) {
        let winner = players.find((p) => p.hand.length === 0);
        updateStats(auth.currentUser?.uid, winner?.uid);
        let host = players.find((p) => p.isHost === true);
        if (auth.currentUser.uid === host.uid) {
            socketRef.current.emit("end game", {
                message,
            });
        }
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
            socketRef.current.emit("stalemate", { players });
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
    function forceDisconnect() {
        navigate("/lobby");
    }

    return {
        messages,
        sendMessage,
        endGame,
        endTurn,
        drawCard,
        startGame,
        forceDisconnect,
    };
};

export default useSocketHook;
