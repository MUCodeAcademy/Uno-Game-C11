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
} from "./shared/components/ProtectedRoute";
import { useUserContext } from "./shared/context";
import { GameProvider } from "./shared/context/GameContext";

function App() {
  return (
    <div>
      {/* {auth.currentUser && (
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
            )} */}
      <Router>
        <Menu></Menu>
        <Routes>
          <Route path="/login" element={<LoginPageWithAuth />} />
          <Route path="/lobby" element={<LobbyPageWithAuth />} />
          <Route path="/about" element={<AboutPage />} />
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
