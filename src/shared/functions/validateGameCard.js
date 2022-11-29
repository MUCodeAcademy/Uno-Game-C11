function validateGameCard(gameCard) {
    if (gameCard.color === "black") {
        return;
    } else {
        if (
            (gameCard.val === "0",
            gameCard.val === "1",
            gameCard.val === "2",
            gameCard.val === "3",
            gameCard.val === "4",
            gameCard.val === "5",
            gameCard.val === "6",
            gameCard.val === "7",
            gameCard.val === "8",
            gameCard.val === "9")
        ) {
            return { color: gameCard.color, number: gameCard.val };
        }
    }
}

export default validateGameCard;
