import React from "react";

function PlayPile() {
  const { activeCard } = useGameContext();
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {/* {activeCard && <div>ACTIVE CARD: {`${activeCard.color} ${activeCard.value}`}</div>} */}
      <img
        src={require(`./cards/${activeCard.color}_${activeCard.value}.png`)}
        alt={`activeCard.color}_${activeCard.value}`}
        title={`${activeCard.color}_${activeCard.value}`}
        style={{ maxHeight: "200px" }}
      ></img>
    </div>
  );
}

export default PlayPile;
