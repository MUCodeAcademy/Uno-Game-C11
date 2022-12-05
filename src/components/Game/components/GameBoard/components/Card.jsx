import React from "react";
import styled from "@emotion/styled";

export function Card({ isTurn, card, handlePlayCardClick }) {
    return (
        <Div isTurn={isTurn} value={card} onClick={handlePlayCardClick}>
            <Img src={require(`./cards/${card.color}_${card.value}.png`)} />
        </Div>
    );
}

export default Card;

const Div = styled("div")((props) => ({
    height: "50px",
    width: "50px",
    margin: "0px 0px 0px 50px",
    transition: "all .2s",
    "&:hover": {
        transform: props.isTurn ? "translate(0px, -10px)" : "",
    },
}));

const Img = styled("img")((props) => ({
    maxHeight: "200px",
}));
