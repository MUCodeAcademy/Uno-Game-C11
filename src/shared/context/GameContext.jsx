import React, { useReducer, useContext, useCallback, useState } from "react";
import { createContext } from "react";
import {
    gameReducer,
    INITIAL_ACTIVE_GAME_STATE,
    SET_ACTIVE_GAME,
} from "../reducers/GameReducer";

const GameContext = createContext();

export function useGameContext() {
    return useContext(GameContext);
}

export function GameProvider(props) {
    // const [activeGame, dispatch] = useReducer(gameReducer, INITIAL_ACTIVE_GAME_STATE);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [playDeck, setPlayDeck] = useState([]);
    const [discardDeck, setDiscardDeck] = useState([]);
    const [players, setPlayers] = useState([]);
    //active card will be the displayed card that the next player
    const [activeCard, setActiveCard] = useState(null);
    const [isReverse, setIsReverse] = useState(false);
    const [shuffling, setShuffling] = useState(false);
    const [turn, setTurn] = useState(0);

    // const setActiveGame = useCallback(
    //     (activeGame) => {
    //         dispatch({ type: SET_ACTIVE_GAME, payload: activeGame });
    //     },
    //     [dispatch]
    // );
    return (
        <GameContext.Provider
            value={{
                isHost,
                setIsHost,
                isGameActive,
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
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
}
