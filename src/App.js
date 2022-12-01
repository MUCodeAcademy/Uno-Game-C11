import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase.config";
import { GamePageWithAuth, LobbyPageWithAuth, LoginPageWithAuth } from "./shared/components/ProtectedRoute";
import { useUserContext } from "./shared/context";
import { GameProvider } from "./shared/context/GameContext";

function App() {
    const { clearUser, setUser } = useUserContext();
    auth.onAuthStateChanged((activeUser) => setUser(activeUser));
    return (
        <div>
            {auth.currentUser && (
                <>
                    <div>{auth.currentUser?.displayName}</div>
                    <button
                        onClick={() => {
                            clearUser();
                            auth.signOut();
                        }}
                    >
                        Sign Out
                    </button>
                </>
            )}
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPageWithAuth />} />
                    <Route path="/Lobby" element={<LobbyPageWithAuth />} />

                    <Route
                        path="/GameRoom/:roomID"
                        element={
                            <GameProvider>
                                <GamePageWithAuth />
                            </GameProvider>
                        }
                    />

                    <Route path="*" element={<Navigate to="/lobby" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
