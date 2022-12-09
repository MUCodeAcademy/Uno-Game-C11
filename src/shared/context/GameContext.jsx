import React, {
    useContext,
    useState,
    createContext,
    useMemo,
} from "react";
import { useUserContext } from "./UserContext";

const GameContext = createContext(null);

export function useGameContext() {
    return useContext(GameContext);
}

export function GameProvider(props) {
    const { user } = useUserContext();
    const [players, setPlayers] = useState([]);
    const isHost = useMemo(() => {
        let host = players.filter((p) => p.uid === user.uid)[0]?.isHost;
        return host;
    }, [players]);
    const [isGameActive, setIsGameActive] = useState(false);
    const [playDeck, setPlayDeck] = useState([]);
    const [discardDeck, setDiscardDeck] = useState([]);
    const [activeCard, setActiveCard] = useState(null);
    const [isReverse, setIsReverse] = useState(false);
    const [shuffling, setShuffling] = useState(false);
    const [turn, setTurn] = useState(0);
    const [waitingUsers, setWaitingUsers] = useState([]);

    return (
        <GameContext.Provider
            value={{
                isGameActive,
                isHost,
                setIsGameActive,
                playDeck,
                setPlayDeck,
                discardDeck,
                setDiscardDeck,
                players,
                setPlayers,
                activeCard,
                setActiveCard,
                isReverse,
                setIsReverse,
                shuffling,
                setShuffling,
                turn,
                setTurn,
                waitingUsers,
                setWaitingUsers,
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
}
