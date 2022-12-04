import React, { useState } from "react";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";
import ChatRoom from "../shared/Chat/ChatRoom";
import { Button } from "../../../shared/styled/components/Button";

export function WaitingRoom({ startGame, messages, sendMessage }) {
    const { isHost, players, setPlayers, setPlayDeck, setActiveCard } = useGameContext();

    function handleClick() {
        let { newDeck, players: newPlayers, gameStartCard } = newGame(players);
        //!is this the set players that is working?

        setPlayers(newPlayers);
        setPlayDeck(newDeck);
        setActiveCard(gameStartCard);
        startGame(newDeck, newPlayers, gameStartCard);
    }

    function Waiting() {
        if (isHost) {
            return (
                <div>
                    <div>Press Start When Ready.</div>
                    <Button
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Start
                    </Button>
                </div>
            );
        }

        return <div>Waiting for host to start the game.</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
                <ChatRoom messages={messages} sendMessage={sendMessage} />
            </div>
            <div>
                <Waiting />
            </div>
        </div>
    );
}

export default WaitingRoom;
