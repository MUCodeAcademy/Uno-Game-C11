import React, { useEffect } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import Card from "./components/Card";
import newGame from "../../../../shared/functions/newGame";
import { useParams } from "react-router-dom";
import { auth } from "../../../../firebase.config";
import useSocketHook from "../../../../shared/hooks/useSocket";

function GameBoard({ endTurn, drawCard, endGame }) {
    const { isGameActive, setPlayers, setPlayDeck, players, setActiveCard } = useGameContext();
    const { roomID } = useParams();

    const { newDeck, players: newPlayers, gameStartCard } = newGame(players);

    // useEffect(() => {
    //     if (isGameActive) {
    //         startGame(newPlayers, newDeck, gameStartCard);
    //     }
    // }, [isGameActive]);

    return (
        <>
            <div>GameBoard</div>

            <PlayPile></PlayPile>
            <PlayerHand endTurn={endTurn} drawCard={drawCard} endGame={endGame}></PlayerHand>
        </>
    );
}

export default GameBoard;
