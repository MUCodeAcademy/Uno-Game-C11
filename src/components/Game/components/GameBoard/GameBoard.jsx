import React, { useEffect, useMemo, useState } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import { auth } from "../../../../firebase.config";
import styled from "@emotion/styled";
import ChatRoom from "../../shared/Chat/ChatRoom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function GameBoard({
  endTurn,
  drawCard,
  endGame,
  reshuffle,
  messages,
  sendMessage,
}) {
  const { players, turn } = useGameContext();

  const activePlayer = useMemo(() => {
    return players[turn];
  }, [turn]);
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      <Grid display={"flex"} justifyContent="center" container spacing={1}>
        <Grid item xs={12} className="chat-btn-container" textAlign={"right"}>
          <Button
            variant="contained"
            className="chat-button"
            size="small"
            onClick={() => setShowChat((curr) => !curr)}
          >
            {!showChat ? "Show" : "Hide"} Chat
          </Button>
        </Grid>
        <Grid margin={1} item xs={11} md={8} marginRight={1} padding={1}>
          <div style={{ margin: "0px 50px 0px 0px" }}>
            <div>Players</div>
            <div style={{ display: "flex", border: "1px solid black" }}>
              {players &&
                players.map((player) => (
                  <Div
                    key={player.uid}
                    activePlayer={player.uid === activePlayer.uid}
                  >
                    <div>{player.name}</div>
                    <div>{player.hand.length} cards</div>
                  </Div>
                ))}
            </div>

            <PlayPile></PlayPile>
          </div>
          <div style={{ margin: "50px 0px 0px 0px" }}>
            <PlayerHand
              endTurn={endTurn}
              drawCard={drawCard}
              endGame={endGame}
              reshuffle={reshuffle}
            ></PlayerHand>
          </div>
        </Grid>
        <Grid item md={3} className={`chat ${showChat ? "show-chat" : ""}`}>
          <ChatRoom messages={messages} sendMessage={sendMessage} />
        </Grid>
      </Grid>
    </>
  );
}

export default GameBoard;

const Div = styled("div")((props) => ({
  border: props.activePlayer ? "2px solid white" : "1px solid black",
}));
