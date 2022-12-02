import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";
import useSocketHook from "../../../shared/hooks/useSocket";
import ChatRoom from "../shared/Chat/ChatRoom";

export function WaitingRoom() {
    const { setActiveGame, isHost } = useGameContext();
    const { id } = useParams();
    const { sendStart, messages, sendMessage } = useSocketHook(id, auth.currentUser?.displayName);
    function Waiting() {
        if (isHost) {
            return (
                <div>
                    <div>Press Start When Ready.</div>
                    <button
                        onClick={() => {
                            sendStart()
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
            <div><ChatRoom messages={messages} sendMessage={sendMessage} /></div>
            <div>
                <Waiting />
            </div>
        </div>
    );
}

export default WaitingRoom;
