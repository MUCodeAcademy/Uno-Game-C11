function checkForWin(players, playerIndex) {
    if (players[playerIndex].hand.length === 0) {
        return true;
    }
    return false;
}

export default checkForWin;
