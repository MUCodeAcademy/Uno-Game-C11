import React, { useReducer, useContext, useCallback, useState } from "react";
import { createContext } from "react";
import { gameReducer, INITIAL_ACTIVE_GAME_STATE, SET_ACTIVE_GAME } from "../reducers/GameReducer";

const GameContext = createContext(null);

export function useGameConText() {
    return useContext(GameContext);
}

export function GameProvider(props) {
    const [activeGame, dispatch] = useReducer(gameReducer, INITIAL_ACTIVE_GAME_STATE);
    const [playDeck, setPlayDeck] = useState([]);
    const [discardDeck, setDiscardDeck] = useState([]);
    const [players, setPlayers] = useState([]);
    //active card will be the displayed card that the next player
    const [activeCard, setActiveCard] = useState([]);

    const setActiveGame = useCallback(
        (activeGame) => {
            dispatch({ type: SET_ACTIVE_GAME, payload: activeGame });
        },
        [dispatch]
    );
    return <GameContext.Provider value={{ activeGame, setActiveGame, playDeck, setPlayDeck, discardDeck, setDiscardDeck, players, setPlayers }}>{props.children}</GameContext.Provider>;
}
