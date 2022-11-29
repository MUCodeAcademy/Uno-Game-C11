import { CardColor, CardVal } from "./cardEnums";

const buildDeck = () => {
    const deck = [];
    const colors = [CardColor.Red, CardColor.Blue, CardColor.Yellow, CardColor.Green];
    // const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "draw2"];

    colors.forEach((c) => {
        //1 each of card 0
        deck.push({ color: c, value: "0" });
        //2 each of cards 1 through 9
        //2 each of skip, reverse, and draw2
        for (let i = 0; i < 2; i++) {
            for (let i = 1; i < 10; i++) {
                deck.push({ color: c, value: i.toString() });
            }
            deck.push({ color: c, value: CardVal.Skip });
            deck.push({ color: c, value: CardVal.Reverse });
            deck.push({ color: c, value: CardVal.DrawTwo });
        }
    });
    //4 each of wild and wild draw 4 cards
    for (let i = 0; i < 4; i++) {
        deck.push({ color: CardColor.Black, val: CardVal.Wild }, { color: CardColor.Black, val: CardVal.WildDrawFour });
    }
    return deck;
};

export default buildDeck;
