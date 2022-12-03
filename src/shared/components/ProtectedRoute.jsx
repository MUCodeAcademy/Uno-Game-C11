import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import GamePage from "../../components/Game/GamePage";
import LobbyPage from "../../components/Lobby/LobbyPage";
import LoginPage from "../../components/Login/LoginPage";
import { useUserContext } from "../context";

export function withAuthentication(WrappedComponent, requiresUser) {
    return (props) => {
        const { user } = useUserContext();
        const redirectTo = useMemo(() => (requiresUser ? "/login" : "/lobby"), []);

        const authorized = useMemo(() => {
            return (!requiresUser && !user) || (requiresUser && user);
        }, [user]);

        if (authorized) {
            return <WrappedComponent {...props} />;
        }

        return <Navigate to={redirectTo} />;
    };
}

export const LobbyPageWithAuth = withAuthentication(LobbyPage, true);
export const GamePageWithAuth = withAuthentication(GamePage, true);
export const LoginPageWithAuth = withAuthentication(LoginPage, false);
