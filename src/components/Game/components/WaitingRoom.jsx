import React, { useState } from "react";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";

export function WaitingRoom() {
    const [ishost, setIsHost] = useState(true);
    const { setActiveGame } = useGameContext(null);

    function handleClick() {
        setActiveGame(true);
    }

    function Waiting() {
        if (ishost === true) {
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
        if (ishost === false) {
            return <div>Waiting for host to start the game.</div>;
        }
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
