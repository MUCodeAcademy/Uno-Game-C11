import React from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";

export function PlayPile() {
    const { activeCard } = useGameContext();
    return (
        <>
            {activeCard && <div>ACTIVE CARD: {`${activeCard.color} ${activeCard.value}`}</div>}
        </>
    );
}

export default PlayPile;
