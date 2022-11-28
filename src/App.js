import "./App.css";
import GamePage from "./components/Game/GamePage";
import LobbyPage from "./components/Lobby/LobbyPage";
import LoginPage from "./components/Login/LoginPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./shared/context";
import { auth } from "./firebase.config";

function App() {
    const { user, clearUser, setUser } = useUserContext();
    auth.onAuthStateChanged((activeUser) => setUser(activeUser));
    return (
        <div>
            {auth.currentUser && (
                <>
                    <div>{auth.currentUser?.displayName}</div>
                    <button
                        onClick={() => {
                            auth.signOut();
                            clearUser();
                        }}
                    >
                        Sigh Out
                    </button>
                </>
            )}
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <LoginPage /> : <Navigate to="/Lobby" />}
                    />
                    <Route
                        path="/Lobby"
                        element={user ? <LobbyPage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/GameRoom/:id"
                        element={user ? <GamePage /> : <Navigate to="/login" />}
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
