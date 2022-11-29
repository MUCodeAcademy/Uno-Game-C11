import React, { useState, useEffect } from "react";
import buildDeck from "../../../../shared/functions/buildDeck";
import dealCards from "../../../../shared/functions/dealCards";
import initialCard from "../../../../shared/functions/initialCard";
import shuffleDeck from "../../../../shared/functions/shuffleDeck";
import validateGameCard from "../../../../shared/functions/validateGameCard";

function GameBoard() {
    const playerCount = 2;
    const [deck, setDeck] = useState(shuffleDeck(buildDeck()));
    const { deck: playDeck, hands } = dealCards(deck, playerCount);
    const [hand, setHand] = useState(hands[0]);
    const hand2 = hands[1];
    const [gameCard, setGameCard] = useState({});
    const discard = [];
    function discardCard(card) {
        discard.push(card);
    }

    discardCard(gameCard);

    return <div>GameBoard</div>;
}

export default GameBoard;
