import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";

const ChooseColorPrompt = ({ setPlayedWild, setActiveCard, endTurn }) => {
    let colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];
    function handleClick(e) {
        setActiveCard((curr) => ({ value: curr.value, color: e.target.value }));
        setPlayedWild(false);
        //TODO: fix end turn
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
};

export default ChooseColorPrompt;
