import React, { useState } from "react";
import { useGameConText } from "../../../shared/context/GameContext";

export function WaitingRoom() {
  const [ishost, setIsHost] = useState(true)
  const { setActiveGame } = useGameConText(null)

  function Waiting() {
    if (ishost === true) {
      return (
        <div>
          <div>Press Start When Ready.</div>
          <button onClick={() => {
            setActiveGame(true)
          }}>Start</button>
        </div>
      )
    }
    if (ishost === false) {
      return (
        <div>Waiting for host to start the game.</div>
      )
    }
  }


  return (
    <div>
      <div>chatRoom here</div>
      <div><Waiting /></div>
    </div>)
}

export default WaitingRoom;
