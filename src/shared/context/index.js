import { UserProvider } from "./UserContext";

export * from "../context/UserContext";

export default function StateProvider(props) {
    return (
        <UserProvider>
            {/* lobby context */}
            {props.children}
            {/* lobby context */}
        </UserProvider>
    );
}
