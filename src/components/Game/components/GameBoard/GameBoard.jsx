import React, { useEffect, useMemo } from "react";
import { useGameContext } from "../../../../shared/context/GameContext";
import WaitingRoom from "../WaitingRoom";
// import { Card, PlayPile, PlayerHand } from "./index";
import PlayPile from "./components/PlayPile";
import PlayerHand from "./components/PlayerHand";
import { auth } from "../../../../firebase.config";
import styled from "@emotion/styled";

function GameBoard({ endTurn, drawCard, endGame, reshuffle }) {
    const { players } = useGameContext();

    const activePlayer = useMemo(() => {
        return players[turn];
    }, [turn]);

    return (
        <>
            <div>
                <div style={{ margin: "0px 50px 0px 0px" }}>
                    <div>Players</div>
                    <div style={{ display: "flex", border: "1px solid black" }}>
                        {players &&
                            players.map((player) => (
                                <Div
                                    key={player.uid}
                                    activePlayer={player.uid === activePlayer.uid}
                                >
                                    <div>{player.name}</div>
                                    <div>{player.hand.length} cards</div>
                                </Div>
                            ))}
                    </div>

                    <PlayPile></PlayPile>
                </div>
                <div style={{ margin: "50px 0px 0px 0px" }}>
                    <PlayerHand
                        endTurn={endTurn}
                        drawCard={drawCard}
                        endGame={endGame}
                        reshuffle={reshuffle}
                    ></PlayerHand>
                </div>
            </div>
        </>
    );
}

export default GameBoard;

const Div = styled("div")((props) => ({
    border: props.activePlayer ? "2px solid white" : "1px solid black",
}));
