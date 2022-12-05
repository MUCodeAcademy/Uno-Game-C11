import React from "react";
import styled from "@emotion/styled";

export function Card({ isTurn, card, handlePlayCardClick }) {
  return (
    <Div isTurn={isTurn} value={card} onClick={() => handlePlayCardClick(card)}>
      <Img src={require(`./cards/${card.color}_${card.value}.png`)} />
    </Div>
  );
}

export default Card;

const Div = styled("div")((props) => ({
  height: "200px",
  width: "140px",
  margin: "0px 0px 0px -50px",
  transition: "all .2s",
  cursor: "pointer",
  "&:hover": {
    transform: props.isTurn ? "translate(0px, -10px)" : "",
    zIndex: 100,
  },
  "&:first-of-type": {
    marginLeft: "0px",
  },
}));

const Img = styled("img")((props) => ({
  maxHeight: "200px",
}));
