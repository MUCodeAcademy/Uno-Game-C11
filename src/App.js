import { useState } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import AboutPage from "./components/About/AboutPage";
import { auth } from "./firebase.config";
import Menu from "./shared/components/Menu";
import {
  GamePageWithAuth,
  LobbyPageWithAuth,
  LoginPageWithAuth,
  LeaderBoardPageWithAuth,
} from "./shared/components/ProtectedRoute";
import { GameProvider } from "./shared/context/GameContext";

function App() {
  const [loading, setLoading] = useState(true);
  auth.onAuthStateChanged(() => {
    setLoading(false);
  });
  return (
    <div>
      {!loading && (
        <Router>
          <Menu></Menu>

          <Routes>
            <Route path="/login" element={<LoginPageWithAuth />} />
            <Route path="/lobby" element={<LobbyPageWithAuth />} />
            <Route path="/leader-board" element={<LeaderBoardPageWithAuth />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/game-room/:roomID"
              element={
                <GameProvider>
                  <GamePageWithAuth />
                </GameProvider>
              }
            />

            <Route path="*" element={<Navigate to="/lobby" />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
