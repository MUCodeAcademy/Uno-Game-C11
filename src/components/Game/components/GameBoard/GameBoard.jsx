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
    const {
        activeGame,
        setActiveGame,
        setPlayers,
        setPlayDeck,
        setDiscardDeck,
        players,
        playDeck,
        discardDeck,
        activeCard,
        setActiveCard,
    } = useGameContext();

    useEffect(() => {
        if (activeGame) {
            // let currentPlayers = [{ uid: "3a8cb4i5fEbeO33OnZvvJ6SvTjU2", name: "player1", hand: [], isHost: true }];
            //TODO host begin game socket
            // setPlayers(currentPlayers);
            //! create deck
            //! shuffle deck
            //! deal cards
            //! set game card
            //! emit players array , playDeack array , gameCard
            const { newDeck, players: newPlayers, gameStartCard } = newGame(currentPlayers);
            setPlayDeck(newDeck);
            setActiveCard(gameStartCard);

            // setPlayers(newPlayers);
            // console.log("players set: " + newPlayers[0].name + " " + newPlayers[0].hand.length);
        }
    }, [activeGame]);

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
