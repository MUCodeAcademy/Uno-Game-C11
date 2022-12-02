import useGameSocketHook from "../hooks/useSocket";
import checkForReshuffle from "./checkForReshuffle";

export default function endTurn() {
    const { endTurn } = useSocket();
    console.log("player turn ended");
    endTurn();
}
