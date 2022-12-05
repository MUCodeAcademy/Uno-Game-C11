import React from "react";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";
import ChatRoom from "../shared/Chat/ChatRoom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function WaitingRoom({ startGame, messages, sendMessage }) {
  const { isHost, players } = useGameContext();

  function handleClick() {
    let { newDeck, players: newPlayers, gameStartCard } = newGame(players);
    startGame(newDeck, newPlayers, gameStartCard);
  }

  function Waiting() {
    if (isHost) {
      return (
        <div>
          <Typography variant="h6" textAlign="center">
            Press Start When Ready
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              handleClick();
            }}
          >
            Start
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Typography variant="h6" textAlign="center">
          Waiting For Host To Start Game
        </Typography>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <ChatRoom messages={messages} sendMessage={sendMessage} />
      </div>
      <div>
        <Waiting />
      </div>
    </div>
  );
}

export default WaitingRoom;
