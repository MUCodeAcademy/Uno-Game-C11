import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";
import { Button } from "../../../../../shared/styled/components/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";

const ChooseColorPrompt = ({ setPlayedWild, setActiveCard, endTurn }) => {
    let colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];
    function handleClick(e) {
        setActiveCard((curr) => ({ value: curr.value, color: e.target.value }));
        setPlayedWild(false);
        endTurn();
    }
    return (
        <>
            <div style={{ backgroundColor: theme.palette.background.paper }}>Pick a color</div>

            {colors.map((c) => (
                <Button key={c} value={c} onClick={(e) => handleClick(e)}>
                    {c}
                </Button>
            ))}
        </>
    );
};

export default ChooseColorPrompt;
