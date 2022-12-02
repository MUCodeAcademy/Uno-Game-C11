import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useUserContext } from "../../shared/context";
import { useGameContext } from "../../shared/context/GameContext";
import useSocketHook from "../../shared/hooks/useSocket";
import GameBoard from "./components/GameBoard/GameBoard";
import WaitingRoom from "./components/WaitingRoom";

function GamePage() {
    const { roomID } = useParams();
    const { user } = useUserContext();
    const { isGameActive } = useGameContext();

    const { messages, sendMessage, endGame, endTurn, drawCard, startGame } = useSocketHook(roomID, auth.currentUser?.displayName);
    //! need to render everyone except current player's hand count

    return (
        <>
            <div>{`Room name: ${roomID}`}</div>
            <div>
                {!isGameActive && <WaitingRoom startGame={startGame} messages={messages} sendMessage={sendMessage} />}
                {isGameActive && <GameBoard endTurn={endTurn} drawCard={drawCard} endGame={endGame} />}
            </div>
        </>
    );
}

export default GamePage;
