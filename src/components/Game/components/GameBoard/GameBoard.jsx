import React, { useEffect } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import Card from "./components/Card";
import newGame from "../../../../shared/functions/newGame";
import drawCard from "../../../../shared/functions/drawCard";

function GameBoard() {
    const { activeGame, setPlayers, setPlayDeck, players, setActiveCard } = useGameContext();

    useEffect(() => {
        if (activeGame) {
            let currentPlayers = [{ name: "player1", hand: [] }];
            setPlayers(currentPlayers);
            const { newDeck, players: newPlayers, gameStartCard } = newGame(currentPlayers);
            setPlayDeck(newDeck);
            setActiveCard(gameStartCard);
            setPlayers(newPlayers);
            // console.log("players set: " + newPlayers[0].name + " " + newPlayers[0].hand.length);
        }
    }, [activeGame]);

    //socket messages useEffect
    useEffect(() => {
        //player drew card message
        //player played card message
    }, [players]);

    return (
        <>
            <div>GameBoard</div>
            {!activeGame && <WaitingRoom></WaitingRoom>}
            {activeGame && (
                <>
                    <PlayPile></PlayPile>
                    <PlayerHand></PlayerHand>
                </>
            )}
        </>
    );
}

export default GameBoard;
