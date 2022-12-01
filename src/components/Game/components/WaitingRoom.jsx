import React, { useState } from "react";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";

export function WaitingRoom() {
    const { setActiveGame, ishost } = useGameContext();

    function Waiting() {
        if (ishost) {
            return (
                <div>
                    <div>Press Start When Ready.</div>
                    //TODO use start game socket hook
                    <button
                        onClick={() => {
                            setActiveGame(true);
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
            <div>chatRoom here</div>
            <div>
                <Waiting />
            </div>
        </div>
    );
}

export default WaitingRoom;
