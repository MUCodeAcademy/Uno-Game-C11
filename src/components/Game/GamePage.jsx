import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useGameContext } from "../../shared/context/GameContext";
import useSocketHook from "../../shared/hooks/useSocket";
import GameBoard from "./components/GameBoard/GameBoard";
import WaitingRoom from "./components/WaitingRoom";
import Typography from "@mui/material/Typography";
import Rules from "../Rules/Rules";

function GamePage() {
    const { roomID } = useParams();

    const { isGameActive, setIsGameActive, players, waitingUsers, activeCard } =
        useGameContext();

    useEffect(() => {
        if (players.length <= 1 && activeCard) {
            setIsGameActive(false);
        }
    }, [players, waitingUsers, activeCard]);

    const {
        messages,
        sendMessage,
        endGame,
        endTurn,
        drawCard,
        startGame,
        reshuffle,
        forceDisconnect,
    } = useSocketHook(roomID, auth.currentUser?.displayName);
    //! need to render everyone except current player's hand count

    return (
        <>
            <Rules />
            <div>
                <Typography
                    variant="h5"
                    textAlign={"center"}
                    padding="5px"
                >{`Room name: ${roomID.toUpperCase()}`}</Typography>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {!isGameActive && (
                        <WaitingRoom
                            startGame={startGame}
                            messages={messages}
                            sendMessage={sendMessage}
                        />
                    )}
                </div>
                <div>
                    {isGameActive && (
                        <GameBoard
                            messages={messages}
                            sendMessage={sendMessage}
                            endTurn={endTurn}
                            drawCard={drawCard}
                            endGame={endGame}
                            reshuffle={reshuffle}
                            forceDisconnect={forceDisconnect}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default GamePage;
