import React, { useEffect } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import Card from "./components/Card";
import newGame from "../../../../shared/functions/newGame";
import useSocketHook from "../../../../shared/hooks/useSocket";

function GameBoard() {
  const {
    activeGame,
    isGameActive,
    setPlayers,
    setPlayDeck,
    players,
    setActiveCard,
  } = useGameContext();

  const { newDeck, players: newPlayers, gameStartCard } = newGame(players);
  const { startGame } = useSocketHook();

  useEffect(() => {
    if (isGameActive) {
      startGame(newPlayers, newDeck, gameStartCard);
    }
  }, [isGameActive]);

  return (
    <>
      <div>GameBoard</div>
      {!activeGame && <WaitingRoom></WaitingRoom>}
      {activeGame && (
        <>
          <PlayPile></PlayPile>
          <PlayerHand></PlayerHand>
        </>
      )}
    </>
  );
}

export default GameBoard;
