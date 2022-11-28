import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { auth } from "./firebase.config";
import { GamePageWithAuth, LobbyPageWithAuth, LoginPageWithAuth } from "./shared/components/ProtectedRoute";
import { useUserContext } from "./shared/context";

function App() {
  const { user, clearUser } = useUserContext()
  return (
    <div>
      {auth.currentUser && (
        <>
          <div>{auth.currentUser?.displayName}</div>
          <button onClick={() => {
            clearUser()
            auth.signOut()
          }}>Sigh Out</button>
        </>
      )}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPageWithAuth />} />
          <Route path='/Lobby' element={<LobbyPageWithAuth />} />
          <Route path='/GameRoom/:id' element={<GamePageWithAuth />} />
          <Route path="*" element={<Navigate to="/lobby" />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
