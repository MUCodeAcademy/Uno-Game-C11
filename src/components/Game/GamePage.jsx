import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useUserContext } from "../../shared/context";
import { useGameContext } from "../../shared/context/GameContext";
import useSocketHook from "../../shared/hooks/useSocket";
import GameBoard from "./components/GameBoard/GameBoard";
import WaitingRoom from "./components/WaitingRoom";
import Typography from "@mui/material/Typography";

function GamePage() {
  const { roomID } = useParams();
  const { user } = useUserContext();
  const { isGameActive } = useGameContext();

  const {
    messages,
    sendMessage,
    endGame,
    endTurn,
    drawCard,
    startGame,
    reshuffle,
  } = useSocketHook(roomID, auth.currentUser?.displayName);
  //! need to render everyone except current player's hand count

  return (
    <div>
      <Typography
        variant="h5"
        textAlign={"center"}
        padding="5px"
      >{`Room name: ${roomID}`}</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!isGameActive && (
          <WaitingRoom
            startGame={startGame}
            messages={messages}
            sendMessage={sendMessage}
          />
        )}
      </div>
      <div>
        {isGameActive && (
          <GameBoard
            messages={messages}
            sendMessage={sendMessage}
            endTurn={endTurn}
            drawCard={drawCard}
            endGame={endGame}
            reshuffle={reshuffle}
          />
        )}
      </div>
    </div>
  );
}

export default GamePage;
