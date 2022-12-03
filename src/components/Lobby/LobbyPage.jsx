import React from "react";
import { useNavigate } from "react-router-dom";

export function LobbyPage() {
    const navigate = useNavigate();

    return (
        <div>
            LobbyPage
            <button onClick={() => navigate("/GameRoom/static")}>Join static room</button>
        </div>
    );
}

export default LobbyPage;
