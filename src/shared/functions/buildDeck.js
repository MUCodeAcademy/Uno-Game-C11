const buildDeck = () => {
    const deck = [];
    const colors = ["red", "blue", "yellow", "green"];
    const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "draw2"];

    colors.forEach((c) => {
        //1 each of card 0
        deck.push({ color: c, value: "0" });
        //2 each of cards 1 through 9
        //2 each of skip, reverse, and draw2
        for (let i = 0; i < 2; i++) {
            for (let i = 1; i < 10; i++) {
                deck.push({ color: c, value: i.toString() });
            }
            deck.push({ color: c, value: "skip" });
            deck.push({ color: c, value: "reverse" });
            deck.push({ color: c, value: "draw2" });
        }
    });
    //4 each of wild and wild draw 4 cards
    for (let i = 0; i < 4; i++) {
        deck.push({ color: "black", val: "wild" }, { color: "black", val: "wildDraw4" });
    }
    return deck;
};

export default buildDeck;
