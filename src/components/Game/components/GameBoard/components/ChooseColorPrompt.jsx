import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";
import Button from "@mui/material/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";
import Typography from "@mui/material/Typography";

const ChooseColorPrompt = ({
  setPlayedWild,
  setActiveCard,
  endTurn,
  newPlayers,
  newDiscardDeck,
  newActiveCard,
  newIsReverse,
  turn,
  resetCountdown,
  playDeck,
}) => {
  let colors = [
    { name: CardColor.Red, color: theme.palette.wild.red },
    { name: CardColor.Blue, color: theme.palette.wild.blue },
    { name: CardColor.Yellow, color: theme.palette.wild.yellow },
    { name: CardColor.Green, color: theme.palette.wild.green },
  ];
  function handleClick(e) {
    resetCountdown();
    newActiveCard.current = {
      value: newActiveCard.current.value,
      color: e.target.value,
    };
    setActiveCard(newActiveCard.current);
    setPlayedWild(false);
    endTurn(
      newPlayers.current,
      newDiscardDeck.current,
      newActiveCard.current,
      newIsReverse.current,
      turn,
      playDeck
    );
  }
  return (
    <>
      <Typography textAlign="center" color="secondary">
        Pick A Wild Color
      </Typography>

      {colors.map((c) => (
        <Button
          variant="contained"
          size="small"
          style={{ margin: "0 4px", backgroundColor: c.color }}
          key={c.name}
          value={c.name}
          onClick={(e) => handleClick(e)}
        >
          {c.name}
        </Button>
      ))}
    </>
  );
};

export default ChooseColorPrompt;
