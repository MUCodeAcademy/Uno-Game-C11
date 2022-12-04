import React from "react";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";
import ChatRoom from "../shared/Chat/ChatRoom";

export function WaitingRoom({ startGame, messages, sendMessage }) {
    const { isHost, players, setPlayers, setPlayDeck, setActiveCard } = useGameContext();

    function handleClick() {
        let { newDeck, players: newPlayers, gameStartCard } = newGame(players);
        console.log(players.length);
        //!is this the set players that is working?
        startGame(newDeck, newPlayers, gameStartCard);
    }

    function Waiting() {
        if (isHost) {
            return (
                <div>
                    <div>Press Start When Ready.</div>
                    <button
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Start
                    </button>
                </div>
            );
        }

        return <div>Waiting for host to start the game.</div>;
    }

    return (
        <div>
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
