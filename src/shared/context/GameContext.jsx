import React, { useReducer, useContext, useCallback } from "react";
import { createContext } from "react";
import {
    gameReducer,
    INITIAL_ACTIVE_GAME_STATE,
    SET_ACTIVE_GAME,
} from "../reducers/GameReducer";

const GameContext = createContext(null);

export function useGameConText() {
    return useContext(GameContext);
}

export function GameProvider(props) {
    const [activeGame, dispatch] = useReducer(gameReducer, INITIAL_ACTIVE_GAME_STATE);

    const setActiveGame = useCallback(
        (activeGame) => {
            dispatch({ type: SET_ACTIVE_GAME, payload: activeGame });
        },
        [dispatch]
    );
    return (
        <GameContext.Provider value={{ activeGame, setActiveGame }}>
            {props.children}
        </GameContext.Provider>
    );
}
