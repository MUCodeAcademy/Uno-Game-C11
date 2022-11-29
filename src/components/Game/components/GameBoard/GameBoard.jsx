import React, { useState, useEffect } from "react";
import buildDeck from "../../../../shared/functions/buildDeck";
import dealCards from "../../../../shared/functions/dealCards";
import initialCard from "../../../../shared/functions/initialCard";
import shuffleDeck from "../../../../shared/functions/shuffleDeck";
import validateGameCard from "../../../../shared/functions/validateCard";

function GameBoard() {
    const playerCount = 2;
    const [deck, setDeck] = useState(shuffleDeck(buildDeck()));
    const { deck: playDeck, hands } = dealCards(deck, playerCount);
    const [hand, setHand] = useState(hands[0]);
    const hand2 = hands[1];
    const [gameColor, setGameColor] = useState(null);
    const [gameNumber, setGameNumber] = useState(null);
    const discard = [];
    const { gameCard } = initialCard(playDeck);
    // console.log(gameCard);

    // when a card is played update gameColor and gameNumber state then send card form player hand to discard pile
    const { color, number } = validateGameCard(gameCard);
    setGameColor(color);
    setGameNumber(number);

    function discardCard(card) {
        discard.push(card);
    }

    discardCard(gameCard);

    return <div>GameBoard</div>;
}

export default GameBoard;
