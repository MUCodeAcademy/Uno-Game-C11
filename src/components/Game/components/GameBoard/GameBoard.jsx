import React, { useMemo, useState } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import ChatRoom from "../../shared/Chat/ChatRoom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Player from "./components/Player";

function GameBoard({
  endTurn,
  drawCard,
  endGame,
  reshuffle,
  messages,
  sendMessage,
  forceDisconnect,
}) {
  const { players, turn, isReverse, activeCard } = useGameContext();
  const turnOrder = useMemo(() => {
    let oldOrder = [...players];
    let newOrder = oldOrder.splice(0, turn + isReverse ? 1 : 0);
    newOrder = [...oldOrder, ...newOrder];
    if (isReverse) return newOrder.reverse();
    return newOrder;
  }, [turn, isReverse, players]);

  const [showChat, setShowChat] = useState(false);
  return (
    <>
      <Grid display={"flex"} justifyContent="center" container spacing={1}>
        {activeCard && (
          <Grid margin={1} item xs={10} md={8} marginRight={1} padding={1}>
            <div>
              <Typography variant="h5" textAlign={"center"}>
                Players
              </Typography>
              <div
                style={{
                  display: "flex",
                  border: "1px solid black",
                  padding: "5px",
                }}
              >
                {players &&
                  turnOrder.map((player) => (
                    <Player
                      key={player.uid}
                      isHost={player.isHost}
                      playerName={player.name}
                      isDev={player.isDev}
                      numCards={player.hand.length}
                    >
                      <div>{player.name}</div>
                      <div>{player.hand.length} cards</div>
                    </Player>
                  ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <PlayPile></PlayPile>
              </div>
            </div>
            <div>
              <PlayerHand
                endTurn={endTurn}
                drawCard={drawCard}
                endGame={endGame}
                reshuffle={reshuffle}
                forceDisconnect={forceDisconnect}
              ></PlayerHand>
            </div>
          </Grid>
        )}
        <Grid
          marginTop="20px"
          item
          md={3}
          className={`chat ${showChat ? "show-chat" : ""}`}
        >
          <ChatRoom messages={messages} sendMessage={sendMessage} />
        </Grid>
        <Grid item xs={12} className="chat-btn-container" textAlign={"center"}>
          <Button
            variant="contained"
            className="chat-button"
            size="small"
            onClick={() => setShowChat((curr) => !curr)}
          >
            {!showChat ? "Show" : "Hide"} Chat
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default GameBoard;
