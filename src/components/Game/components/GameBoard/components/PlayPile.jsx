import React from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";
import { Typography } from "@mui/material";
import CardStack from "./CardStack";

function PlayPile() {
  const { activeCard, discardDeck, playDeck } = useGameContext();
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ width: "100px" }}>
        <Typography style={{ marginBottom: "5px", textAlign: "center" }}>
          Discard
        </Typography>
        <CardStack pile={discardDeck.length > 0 ? [1] : []} show={true} />
      </div>
      {/* {activeCard && <div>ACTIVE CARD: {`${activeCard.color} ${activeCard.value}`}</div>} */}
      <div>
        <Typography style={{ marginBottom: "5px", textAlign: "center" }}>
          Active Card
        </Typography>
        <img
          src={require(`./cards/${activeCard.color}_${activeCard.value}.png`)}
          alt={`activeCard.color}_${activeCard.value}`}
          title={`${activeCard.color}_${activeCard.value}`}
          style={{ maxHeight: "125px" }}
        ></img>
      </div>
      <div style={{ width: "90px" }}>
        <Typography
          style={{ marginBottom: "5px", textAlign: "center", flexGrow: "1" }}
        >
          Draw
        </Typography>
        <CardStack pile={playDeck} show={false} />
      </div>
    </div>
  );
}

export default PlayPile;
