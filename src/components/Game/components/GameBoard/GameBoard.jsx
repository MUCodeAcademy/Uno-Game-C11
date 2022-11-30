import React from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
import { Card, PlayPile, PlayerHand } from "./index";

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
    } = useGameContext(null);

    async function initPlayers() {
        await setPlayers([{ name: "player1", hand: [] }]);
        try {
            const { newDeck, players: newPlayers, gameStartCard } = newGame(players);
            setPlayDeck(newDeck);
            setActiveCard(gameStartCard);
            setPlayers(newPlayers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (activeGame) {
            initPlayers();
        } else {
            return;
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
