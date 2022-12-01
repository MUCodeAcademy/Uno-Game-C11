import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import newGame from "../functions/newGame";

const useGameSocketHook = (roomID, username) => {
    const socketRef = useRef(null)
    const [messages, setMessages] = useState([])
    const [socketIDs, setSocketIDs] = useState([])
    const [started, setStarted] = useState(false)
    const [cards, setCards] = useState({})
    const { setIsHost, isHost, activeGame, setActiveGame, setActiveCard, players, setPlayers, activeCard, playDeck, setPlayDeck, discardDeck, setdiscardDeck } = useGameContext();
    useEffect(() => {
        socketRef.current = io("http://localhost:8080", {
            query: {
                username,
                roomID,
            },
        })

        socketRef.current.on("host check", (roomCount) => {
            if (roomCount == 0) {
                setIsHost(true)
            }
        })

        socketRef.current.on("game active", (gameActive) => {
            setActiveGame(gameActive)
        })

        socketRef.current.on("draw card", (players) => {
            let deck = playDeck
            deck.pop()
            setPlayDeck(deck)
            setPlayers(players)

        })

        socketRef.current.on("send cards", (cards) => {
            setCards(cards)
        })

        socketRef.current.on("end trun", ({ activeCard, isRevers, players, discardDeck }) => {
            setdiscardDeck(discardDeck)
            setActiveCard(activeCard)
            setIsRevers(isRevers)
            setPlayers(players)
        })



        if (isHost) {
            if (activeGame) {
                socketRef.current.emit("game active", (activeGame))

            }

            if (activeGame === false) {
                socketRef.current.emit("game active", (activeGame))
            }
        }

        return () => socketRef.current?.disconnect()

    }, [roomID, username, isHost, activeGame]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body })
    }

    function endTurn() {
        socketRef.current.emit("end turn", { players, discardDeck, activeCard, isRevers })
    }

    function drawCard() {
        socketRef.current.emit("darw card", players)
    }

    return { messages, sendMessage, started, sendStart, endTurn, sendCards, cards };
};

export default useGameSocketHook;