import React from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

function LobbyPage() {
    const navigate = useNavigate();

    return (
        <div>
            LobbyPage
            <button onClick={() => navigate("/GameRoom/static")}>Join static room</button>
        </div>
    );
}

export default LobbyPage;
