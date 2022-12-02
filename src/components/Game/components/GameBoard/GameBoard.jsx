import React, { useEffect } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import Card from "./components/Card";
import newGame from "../../../../shared/functions/newGame";
import { useParams } from "react-router-dom";

function GameBoard({ endTurn, drawCard, endGame }) {
    return (
        <>
            <div>GameBoard</div>

            <PlayPile></PlayPile>
            <PlayerHand endTurn={endTurn} drawCard={drawCard} endGame={endGame}></PlayerHand>
        </>
    );
}

export default GameBoard;
