import React from "react";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
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
