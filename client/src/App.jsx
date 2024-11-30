import { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import useCheckToken from "./hooks/useCheckToken";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useCheckToken(setLoading, setLoggedIn);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        {loading ? (
          <Route path="*" element={<div>Spinner</div>} />
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={loggedIn ? <Profile /> : <Navigate to="/login" />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
