import useGameSocketHook from "../hooks/useGameSockets";
import checkForReshuffle from "./checkForReshuffle";



export default function endTurn() {
    const { endTurn } = useGameSocketHook
    console.log("player turn ended");
    endTurn()

}
