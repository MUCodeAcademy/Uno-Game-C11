import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { auth } from "../../firebase.config";
import { useGameContext } from "../context/GameContext";
import { checkForEndGame, reshuffleDeck } from "../functions";

import { CardValue } from "../functions";
import nextTurn from "../functions/nextTurn";

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
        socketRef.current = io("localhost:8080", {
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

        socketRef.current.on("draw card", ({ players, playDeck, turn, draws, activeCard, discardDeck, isReverse }) => {
            let cards = playDeck.splice(0, draws);
            //! splice is removing from beginning of playDeck

            if (playDeck.length === 0) {
                if (discardDeck.length === 0) {
                    console.log("STALEMATE in draw card socket conditions met");
                    endTurn(players, discardDeck, activeCard, isReverse, turn, playDeck);
                    return;
                }
                console.log("playDeck is empty");
                if (discardDeck.length + playDeck.length < draws) {
                    console.log("discardDeck.len + playDeck.length < 1, turn is ending");
                    endTurn(players, discardDeck, activeCard, isReverse, turn, playDeck);
                } else {
                    console.log("discardDeck.len + playDeck.length >=1, deck should reshuffle");
                    players[turn].hand = [...players[turn].hand, ...cards];
                    console.log("discard deck in draw card socket inside else statement");
                    console.log(discardDeck);
                    setPlayDeck(reshuffleDeck(discardDeck, activeCard));
                    setDiscardDeck([]);
                    setPlayers(players);
                }
            }
            players[turn].hand = [...players[turn].hand, ...cards];
            setPlayDeck(playDeck);
            setPlayers(players);
        });

        socketRef.current.on("end turn", ({ players, discardDeck, activeCard, isReverse, turn, playDeck }) => {
            const message = checkForEndGame(players, playDeck, discardDeck);
            //message will be null if end game conditions are not met
            if (message) {
                endGame(message);
            }
            setDiscardDeck(discardDeck);
            setActiveCard(activeCard);
            setIsReverse(isReverse);
            setPlayers(players);
            const { next, skipped } = nextTurn(turn, isReverse, players, activeCard);
            if (activeCard.value === CardValue.DrawTwo || activeCard.value === CardValue.WildDrawFour || activeCard.value === CardValue.Skip) {
                setTurn(skipped);
            } else {
                setTurn(next);
            }
            if (activeCard.value === CardValue.DrawTwo || activeCard.value === CardValue.WildDrawFour) {
                const draw = activeCard.value === CardValue.DrawTwo ? 2 : 4;
                drawCard(players, playDeck, next, draw, isReverse);
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

    function endTurn(players, discardDeck, activeCard, isReverse, turn, playDeck) {
        socketRef.current.emit("end turn", {
            players,
            discardDeck,
            activeCard,
            isReverse,
            turn,
            playDeck,
        });
    }

    function drawCard(players, playDeck, turn, draws, activeCard, discardDeck, isReverse) {
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
