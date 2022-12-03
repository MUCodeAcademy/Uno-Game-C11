import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";

export function ChooseColorPrompt({ setPlayedWild, setActiveCard, endTurn }) {
    let colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];
    function handleClick(e) {
        setActiveCard((curr) => ({ value: curr.value, color: e.target.value }));
        setPlayedWild(false);
        endTurn();
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
