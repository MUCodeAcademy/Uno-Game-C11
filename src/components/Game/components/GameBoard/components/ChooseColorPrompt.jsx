import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";

export function ChooseColorPrompt({ setPlayedWild, setActiveCard, endTurn }) {
    let colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];
    function handleClick(e) {
        newActiveCard.current = { value: newActiveCard.current.value, color: e.target.value };
        setActiveCard(newActiveCard.current);
        setPlayedWild(false);
        endTurn(
            newPlayers.current,
            newDiscardDeck.current,
            newActiveCard.current,
            newIsReverse.current,
            turn
        );
    }
    return (
        <>
            <div>Pick a color</div>
            {colors.map((c) => (
                <button key={c} value={c} onClick={(e) => handleClick(e)}>
                    {c}
                </button>
            ))}
        </>
    );
}

export default ChooseColorPrompt;
