import React from "react";
import styled from "@emotion/styled";

export function Card({ isTurn, card, handlePlayCardClick }) {
  return (
    <Div isTurn={isTurn} onClick={() => handlePlayCardClick(card)}>
      <Img src={require(`./cards/${card.color}_${card.value}.png`)} />
    </Div>
  );
}

export default Card;

export const Div = styled("div")((props) => ({
  height: "125px",
  margin: "0px 0px 0px -40px",
  transition: "all .2s",
  cursor: "pointer",
  "&:hover:not(.stack)": {
    transform: props.isTurn ? "translate(0px, -10px)" : "",
    zIndex: 100,
  },
  "&:first-of-type": {
    marginLeft: "0px",
  },
  "&.stack": {
    "&:not(.discard)": {
      left: `${props.idx * 0.25}px`,
      borderLeft: props.border ? ".25px solid black" : "",
      position: "absolute",
    },
    cursor: "auto",
    height: "100px",
    marginLeft: "0px",
  },
}));

export const Img = styled("img")((props) => ({
  maxHeight: "125px",
  "&.stack": {
    height: "100px",
  },
}));
