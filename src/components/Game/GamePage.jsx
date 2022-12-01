import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../shared/context";
import { useGameContext } from "../../shared/context/GameContext";
import useSocketHook from "../../shared/hooks/useSocket";
import GameBoard from "./components/GameBoard/GameBoard";

function GamePage() {
    const { roomID } = useParams();
    const { user } = useUserContext();
    const { players } = useGameContext();

    const { started, messages, sendMessage } = useSocketHook(roomID, user.displayName);
    //! need to render everyone except current player's hand count

    return (
        <>
            <div>{`Room name: ${roomID}`}</div>

            <div>
                {players && (
                    <div>
                        {players
                            .filter((player) => player.uid !== user.uid)
                            .map((p) => {
                                return (
                                    <div key={p.uid}>
                                        <div>{p.name}</div>
                                        <div>{`Cards: ${p.hand.length}`}</div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
            <div style={{ overflowY: "scroll", height: "300px", width: "300px", border: "1px solid black" }}>
                {messages.map((m, idx) => {
                    return <div key={idx}>{m}</div>;
                })}
            </div>
            <GameBoard></GameBoard>
        </>
    );
}

export default GamePage;
