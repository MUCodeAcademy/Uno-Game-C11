import React, {
  useContext,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { useUserContext } from "./UserContext";
// import {
//     INITIAL_GAME_STATE,
//     TOGGLE_IS_GAME_ACTIVE,
//     TOGGLE_IS_HOST,
//     SET_PLAY_DECK,
//     SET_ACTIVE_CARD,
//     SET_DISCARD_DECK,
//     SET_IS_REVERSE,
//     SET_PLAYERS,
//     SET_SHUFFLING,
//     SET_TURN,
//     gameReducer,
// } from "../reducers/GameReducer";

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
  //! const [isGameActive, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //! const setIsGameActive = useCallback(
  //     (isGameActive) => {
  //         dispatch({ type: TOGGLE_IS_GAVE_ACTIVE, payload: isGameActive });
  //     },
  //     [dispatch]
  // );
  //* const [isHost, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //* const setIsHost = useCallback(
  //     (isHost) => {
  //         dispatch({ type: TOGGLE_IS_HOST, payload: isHost });
  //     },
  //     [dispatch]
  // );
  //! const [playDeck, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //! const setPlayDeck = useCallback(
  //     (playDeck) => {
  //         dispatch({ type: SET_PLAY_DECK, payload: playDeck });
  //     },
  //     [dispatch]
  // );
  //* const [discardDeck, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //* const setDiscardDeck = useCallback(
  //     (discardDeck) => {
  //         dispatch({ type: SET_DISCARD_DECK, payload: discardDeck });
  //     },
  //     [dispatch]
  // );
  //active card will be the displayed card that the next player
  //! const [players, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //! const setPlayers = useCallback(
  //     (players) => {
  // dispatch({ type: SET_PLAYERS, payload: players });
  //     },
  //     [dispatch]
  // );
  //* const [activeCard, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //* const setActiveCard = useCallback(
  //     (activeCard) => {
  // dispatch({ type: SET_ACTIVE_CARD, payload: activeCard });
  //     },
  //     [dispatch]
  // );
  //! const [isReverse, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //! const setIsReverse = useCallback(
  //     (isReverse) => {
  // dispatch({ type: SET_IS_REVERSE, payload: isReverse });
  //     },
  //     [dispatch]
  // );
  //* const [shuffling, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //* const setShuffling = useCallback(
  //     (shuffling) => {
  // dispatch({ type: SET_SHUFFLING, payload: shuffling });
  //     },
  //     [dispatch]
  // );
  //! const [turn, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  //! const setTurn = useCallback(
  //     (turn) => {
  // dispatch({ type: SET_TURN, payload: turn });
  //     },
  //     [dispatch]
  // );

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
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
