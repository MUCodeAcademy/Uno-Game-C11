import React, { useMemo } from "react";
import { Div, Img } from "./Card";

function CardStack({ pile, show }) {
  const toDisplay = useMemo(() => {
    if (show) return [...pile].reverse();
    return pile;
  }, [pile, show]);
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        margin: "10px 0px",
      }}
    >
      {toDisplay.map((c, idx) => (
        <Div
          idx={idx}
          border={idx % 4 === 0}
          key={c.value + c.color + idx}
          className={`stack`}
        >
          {<Img className="stack" src={require(`./cards/deck.png`)} />}
        </Div>
      ))}
    </div>
  );
}

export default CardStack;
