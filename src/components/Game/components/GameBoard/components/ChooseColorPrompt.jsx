import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";

const ChooseColorPrompt = (setActiveCard) => {
    let colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];

    function handleClick(e) {
        setActiveCard((curr) => {
            curr.CardColor = e.target.value;
        });
    }
    return (
        <>
            <div>Pick a color</div>
            {colors.map((c) => {
                <button key={c} value={c} onClick={(e) => handleClick(e)}>
                    {c}
                </button>;
            })}
        </>
    );
};

export default ChooseColorPrompt;
