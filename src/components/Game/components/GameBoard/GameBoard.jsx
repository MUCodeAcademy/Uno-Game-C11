import React, { useEffect, useMemo } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import { auth } from "../../../../firebase.config";

function GameBoard({ endTurn, drawCard, endGame }) {
  const { players } = useGameContext();

  const otherPlayers = useMemo(() => {
    return players.filter((player) => player.uid !== auth.currentUser.uid);
  }, [players]);

  return (
    <>
      <div>
        <div style={{ margin: "0px 50px 0px 0px" }}>
          <div>Other players</div>
          <div style={{ display: "flex", border: "1px solid black" }}>
            {otherPlayers &&
              otherPlayers.map((player) => (
                <div key={player.uid} style={{ border: "1px solid red" }}>
                  <div>{player.name}</div>
                  <div>{player.hand.length} cards</div>
                </div>
              ))}
          </div>

          <PlayPile></PlayPile>
        </div>
        <div style={{ margin: "50px 0px 0px 0px" }}>
          <PlayerHand
            endTurn={endTurn}
            drawCard={drawCard}
            endGame={endGame}
          ></PlayerHand>
        </div>
      </div>
    </>
  );
}

export default GameBoard;
