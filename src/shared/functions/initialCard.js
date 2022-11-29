import discardCard from "./discardCard";

//grab the initial play card
export default function initialCard(playDeck) {
    let gameCard = playDeck.pop();
    return { gameCard, playDeck };
}
