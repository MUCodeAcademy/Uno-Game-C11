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
    const { activeGame, setActiveGame, setPlayers, setPlayDeck, setDiscardDeck, players, playDeck, discardDeck, activeCard, setActiveCard } = useGameContext();

    useEffect(() => {
        if (activeGame) {
            let currentPlayers = [{ uid: "3a8cb4i5fEbeO33OnZvvJ6SvTjU2", name: "player1", hand: [], isHost: true }];
            setPlayers(currentPlayers);
            const { newDeck, players: newPlayers, gameStartCard } = newGame(currentPlayers);
            setPlayDeck(newDeck);
            setActiveCard(gameStartCard);
            setPlayers(newPlayers);
        }
    }, [activeGame]);

    //socket messages useEffect
    useEffect(() => {
        //player drew card message
        //player played card message
    }, [players]);

    function handleClick() {
        const { players, playDeck } = drawCard();
        setPlayDeck(playDeck);
        setPlayers(players);
    }

    return (
        <>
            <div>GameBoard</div>
            {!activeGame && <WaitingRoom></WaitingRoom>}
            {activeGame && (
                <>
                    <PlayPile></PlayPile>
                    <button onClick={() => handleClick()}>Draw Card</button>
                    <PlayerHand></PlayerHand>
                </>
            )}
        </>
    );
}

export default GameBoard;
