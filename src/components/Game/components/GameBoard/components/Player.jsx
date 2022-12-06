import React from "react";
import playerNameCard from "./cards/player_name.png";
import Typography from "@mui/material/Typography";
import { theme } from "../../../../../shared/styled/themes/Theme";

function Player({ playerName, numCards, activePlayer }) {
  return (
    <div
      style={{
        height: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "100px",
        padding: "2px",
        border: `1px solid ${
          activePlayer ? theme.palette.secondary.light : "rgba(0,0,0,0)"
        }`,
      }}
    >
      <Typography fontSize="12px" color="secondary">
        {playerName}
      </Typography>
      <div
        style={{
          backgroundImage: `url(${playerNameCard})`,
          backgroundRepeat: "no-repeat",
          height: "100px",
          backgroundSize: "75px 100px",
          backgroundPosition: "center center",
          textAlign: "center",
        }}
      >
        <Typography
          width="50px"
          fontSize="16px"
          lineHeight="1"
          margin="30px auto"
          textAlign="center"
          color="primary"
        >
          {numCards} cards
        </Typography>
      </div>
    </div>
  );
}

export default Player;
