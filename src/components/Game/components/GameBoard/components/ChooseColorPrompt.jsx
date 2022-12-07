import React from "react";
import { CardColor } from "../../../../../shared/functions/cardEnums.js";
import { Button } from "../../../../../shared/styled/components/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";

const ChooseColorPrompt = ({ resetCountdown, setPlayedWild, setActiveCard, endTurn, newPlayers, newDiscardDeck, newActiveCard, newIsReverse, turn, playDeck }) => {
    let colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];
    function handleClick(e) {
        resetCountdown();
        newActiveCard.current = {
            value: newActiveCard.current.value,
            color: e.target.value,
        };
        setActiveCard(newActiveCard.current);
        setPlayedWild(false);
        endTurn(newPlayers.current, newDiscardDeck.current, newActiveCard.current, newIsReverse.current, turn, playDeck);
    }
    return (
        <div style={{ backgroundColor: theme.palette.background.paper }}>
            <div>Pick a color</div>

            {colors.map((c) => (
                <Button key={c} value={c} onClick={(e) => handleClick(e)}>
                    {c}
                </Button>
            ))}
        </div>
    );
};

export default ChooseColorPrompt;
