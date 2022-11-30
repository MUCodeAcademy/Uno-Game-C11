import React from "react";
import { useGameContext } from "../../shared/context/GameContext";
import GameBoard from "./components/GameBoard/GameBoard";

function GamePage() {
    return (
        <>
            <div>GamePage</div>
            <GameBoard></GameBoard>
        </>
    );
}

export default GamePage;
