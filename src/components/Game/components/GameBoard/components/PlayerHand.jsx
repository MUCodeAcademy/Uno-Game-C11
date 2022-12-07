import React, { useMemo, useRef, useState } from "react";
import { useGameContext } from "../../../../../shared/context/GameContext";

import {
  removeCardFromHand,
  validatePlayedCard,
  playCard,
  shuffleDeck,
  CardValue,
  CardColor,
} from "../../../../../shared/functions";
import ChooseColorPrompt from "./ChooseColorPrompt";
import { auth } from "../../../../../firebase.config";
import Button from "@mui/material/Button";
import { theme } from "../../../../../shared/styled/themes/Theme";
import Card from "./Card";

function PlayerHand({ endTurn, drawCard }) {
  const {
    players,
    activeCard,
    setActiveCard,
    isGameActive,
    playDeck,
    discardDeck,
    isReverse,
    turn,
  } = useGameContext();

  const [playedWild, setPlayedWild] = useState(false);
  //! this wasn't working because playerhand is rerendering and setting these back to undefined
  const newPlayers = useRef(players);
  const newDiscardDeck = useRef(discardDeck);
  const newIsReverse = useRef(isReverse);
  const newActiveCard = useRef(activeCard);

  let playerIndex = players.findIndex((p) => p.uid === auth.currentUser.uid);

  function handleDrawClick() {
    //only allow draw/playcard when it's current player's turn (and they aren't currently picking a color after playing a wild)
    if (isPlayersTurn && !playedWild) {
      drawCard(players, playDeck, turn, 1, activeCard, discardDeck, isReverse);
    }
  }

  const isPlayersTurn = useMemo(() => {
    return turn === playerIndex;
  });
  function handlePlayCardClick(card) {
    if (isPlayersTurn && !playedWild) {
      if (validatePlayedCard(card, activeCard)) {
        newPlayers.current = removeCardFromHand(players, playerIndex, card);
        newActiveCard.current = card;
        newIsReverse.current =
          card.value === CardValue.Reverse ? !isReverse : isReverse;
        newDiscardDeck.current = discardDeck;
        setPlayedWild(card.color === CardColor.Black);
        //if wild played, wait for color picker prompt before ending turn
        if (card.color !== CardColor.Black) {
          endTurn(
            newPlayers.current,
            newDiscardDeck.current,
            newActiveCard.current,
            newIsReverse.current,
            turn,
            playDeck
          );
        }
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <div style={{ height: "50px", marginTop: "5px" }}>
        {playedWild && (
          <ChooseColorPrompt
            setPlayedWild={setPlayedWild}
            setActiveCard={setActiveCard}
            playDeck={playDeck}
            endTurn={endTurn}
            newPlayers={newPlayers}
            newDiscardDeck={newDiscardDeck}
            newActiveCard={newActiveCard}
            newIsReverse={newIsReverse}
            turn={turn}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: "100%",
          margin: "5px",
          height: "165px",
          overflowX: "scroll",
          alignItems: "center",
        }}
      >
        {isGameActive &&
          players[playerIndex] &&
          players[playerIndex].hand.map((card, idx) => (
            <Card
              key={idx}
              isTurn={isPlayersTurn}
              card={card}
              handlePlayCardClick={handlePlayCardClick}
            />
          ))}
      </div>
      <div>
        {isPlayersTurn && (
          <h4 style={{ color: theme.palette.secondary.main }}>
            It's your turn!
          </h4>
        )}
      </div>

      <div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            handleDrawClick();
          }}
        >
          Draw Card
        </Button>
        {/* <Button onClick={() => handleDrawClick()}>Draw Card</Button> */}
      </div>
    </div>
  );
}

export default PlayerHand;
