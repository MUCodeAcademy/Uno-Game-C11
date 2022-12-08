import React from "react";
import { useGameContext } from "../../../shared/context/GameContext";
import newGame from "../../../shared/functions/newGame";
import ChatRoom from "../shared/Chat/ChatRoom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function WaitingRoom({ startGame, messages, sendMessage }) {
    const { isHost, players, waitingUsers } = useGameContext();

    function handleClick() {
        let player = [...players, ...waitingUsers];
        let { newDeck, players: newPlayers, gameStartCard } = newGame(player);
        startGame(newDeck, newPlayers, gameStartCard);
    }

    function Waiting() {
        if (isHost) {
            if ([...players, ...waitingUsers].length <= 1) {
                return (
                    <div>
                        <Typography variant="h6" textAlign="center">
                            Waiting for someone to join...
                        </Typography>
                    </div>
                );
            }
            return (
                <div>
                    <Typography variant="h6" textAlign="center">
                        Press Start When Ready
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Start
                    </Button>
                </div>
            );
        }

        return (
            <div>
                <Typography variant="h6" textAlign="center">
                    Waiting For Host To Start Game
                </Typography>
            </div>
        );
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
