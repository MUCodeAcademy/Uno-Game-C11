import React, { useState } from "react";
import buildDeck from "../../../../shared/functions/buildDeck";
import dealCards from "../../../../shared/functions/dealCards";
import shuffleDeck from "../../../../shared/functions/shuffleDeck";

function GameBoard() {
    const playerCount = 2;
    const [deck, setDeck] = useState(shuffleDeck(buildDeck()));
    const { deck: playDeck, hands } = dealCards(deck, playerCount);
    const [hand, setHand] = useState(hands[0]);
    const hand2 = hands[1];
    console.log(deck, hand, hand2);
    return <div>GameBoard</div>;
}

export default GameBoard;
