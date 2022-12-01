import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const useSocketHook = (roomID, username) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [cards, setCards] = useState({});
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: {
        username,
        roomID,
      },
    });

    socketRef.current.on("user join", (username) => {
      setMessages((curr) => [...curr, { body: `${username} has connected` }]);
    });

    socketRef.current.on("new message", (msg) => {
      setMessages((curr) => [...curr, msg]);
    });

    socketRef.current.on("user left", (username) => {
      setMessages((curr) => [...curr, { body: `${username} has connected` }]);
    });

    socketRef.current.on("start game", () => {
      setGameActive(true);
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

  return {
    messages,
    sendMessage,
    started,
    sendStart,
    endTurn,
    sendCards,
    cards,
  };
};

export default useSocketHook;
