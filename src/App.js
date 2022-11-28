import "./App.css";
import GamePage from "./components/Game/GamePage";
import LobbyPage from "./components/Lobby/LobbyPage";
import LoginPage from "./components/Login/LoginPage";

function App() {
  const { user, clearUser } = useUserContext()
  return (
    <div>
      {auth.currentUser && (
        <>
          <div>{auth.currentUser?.displayName}</div>
          <button onClick={() => {
            clearUser
            auth.signOut()
          }}>Sigh Out</button>
        </>
      )}
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/Lobby" />} />
          <Route path='/Lobby' element={user ? <LobbyPage /> : <Navigate to="/login" />} />
          <Route path='/GameRoom/:id' element={user ? <GamePage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
