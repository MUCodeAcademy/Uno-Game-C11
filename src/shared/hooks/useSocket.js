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
        setPlayers,
        activeCard,
        setPlayDeck,
        setShuffling,
        setWaitingUsers,
        setDiscardDeck,
        setIsReverse,
        setTurn,
    } = useGameContext();
    const socketRef = useRef(null);
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

    const onConnect = (name, uid, isHost, isActive, isDev) => {
        let player = { name, uid, hand: [], isHost, isDev };
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
            return [...curr, player];
        });
    };

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER, {
            query: {
                username,
                roomID,
                isDev: auth.currentUser?.isDev,
                uid: auth.currentUser?.uid,
            },
        });

        socketRef.current.on(
            "draw card",
            ({ players, playDeck, turn, draws, discardDeck }) => {
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
                    drawCard(players, playDeck, next, draw, [...discardDeck, activeCard]);
                }
            }
        );
        socketRef.current.on(
            "user connect",
            ({ username, uid, isHost, activeGame, isDev }) => {
                onConnect(username, uid, isHost, activeGame, isDev);
            }
        );

        socketRef.current.on("start game", ({ players, playDeck, activeCard, turn, uid }) => {
            setPlayers(players);
            setPlayDeck(playDeck);
            setActiveCard(activeCard);
            setDiscardDeck([]);
            setIsGameActive(true);
            setTurn(turn);
            setWaitingUsers([]);
            addGamePlayed(auth.currentUser?.uid, uid);
        });

        socketRef.current.on("stalemate", ({ players }) => {
            endGame("Stalemate. There are no cards left to be drawn", players);
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });
        socketRef.current.on("user disconnect", ({ username, uid, activeGame, isHost }) => {
            setMessages((curr) => [...curr, { body: `${username} has disconnected` }]);
            setPlayers((curr) => {
                let playerIndex = curr.findIndex((p) => p.uid === uid);
                let needsWaitHost = false;
                if (playerIndex >= 0) {
                    if (activeGame) {
                        let hand = curr[playerIndex].hand;
                        let numPlayers = curr.length - 1;
                        setTurn((currTurn) => {
                            return currTurn === numPlayers ? currTurn - 1 : currTurn;
                        });
                        setDiscardDeck((currDiscard) => [...currDiscard, ...hand]);
                    }
                    curr.splice(playerIndex, 1);
                    needsWaitHost = curr.length === 0 && isHost;
                    if (!needsWaitHost && isHost) {
                        curr[0].isHost = true;
                    } else if (needsWaitHost && isHost) {
                        setWaitingUsers((currWait) => {
                            currWait[0].isHost = true;
                            return [...currWait];
                        });
                    }
                    return [...curr];
                } else {
                    setWaitingUsers((currWait) => {
                        let waitIndex = currWait.findIndex((p) => p.uid === uid);
                        currWait.splice(waitIndex, 1);
                        if (isHost && curr.length === 0) {
                            currWait[0].isHost = true;
                        }

                        return [...currWait];
                    });
                    if (isHost && curr.length > 0) {
                        curr[0].isHost = true;
                        return [...curr];
                    }
                    return curr;
                }
            });
        });

        socketRef.current.on("end game", ({ message, winner, host }) => {
            if (message === "Stalemate, not enough cards to draw.") {
                updateStats(auth.currentUser?.uid, winner, host);
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
        let firstDev = newPlayers.findIndex((d) => d.isDev);
        let turn = firstDev >= 0 ? firstDev : Math.floor(Math.random() * newPlayers.length);
        socketRef.current.emit("start game", {
            players: newPlayers,
            playDeck: newDeck,
            activeCard: gameStartCard,
            turn,
        });
    }

    function endGame(message, players) {
        let winner = players.find((p) => p.hand.length === 0);
        let host = players.find((p) => p.isHost === true);
        if (auth.currentUser.uid === host.uid) {
            socketRef.current.emit("end game", {
                message,
                winner,
                host,
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

    function drawCard(players, playDeck, turn, draws, discardDeck) {
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
            discardDeck,
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
