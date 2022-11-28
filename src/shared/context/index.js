import { userReducer } from "../reducers/userReducer";
import { UserProvider } from "./UserContext";

export * from "../context/UserContext";

export default function StateProvider(props) {
    return (
        <UserProvider>
            {/* lobby context */}
            {/* game context */}
            {props.children}
            {/* game context */}
            {/* lobby context */}
        </UserProvider>
    );
}
