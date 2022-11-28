import React, { useState } from "react";

export function WaitingRoom() {
  const [ishost, setIsHost] = useState(true)

  function Waiting() {
    if (ishost === true) {
      return (
        <div>
          <div>Press Start When Ready.</div>
          <button onClick={() => {
            //set game to start
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
