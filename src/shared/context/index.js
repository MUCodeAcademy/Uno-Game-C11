import { GameProvider } from "./GameContext";
import { UserProvider } from "./UserContext";

export * from "../context/UserContext";

export default function StateProvider(props) {
    return (
        <UserProvider>
            {/* lobby context */}
            <GameProvider>{props.children}</GameProvider>
            {/* lobby context */}
        </UserProvider>
    );
}
