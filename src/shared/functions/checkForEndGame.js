//should only need to check a single player's hand if this is run after every time a card is played
function checkForEndGame(player) {
    let gameOver = { isGameOver: false, winner: "" };
    if (player.hand.length === 0) {
        gameOver.isGameOver = true;
        gameOver.winner = player.name;
    }
    return gameOver;
}

export default checkForEndGame;
