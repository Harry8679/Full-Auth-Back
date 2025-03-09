import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import { AuthContext } from "./context/AuthContext"; // ✅ Import du contexte
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  const { user } = useContext(AuthContext); // ✅ Utilisation du contexte

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {!user ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} /> {/* ✅ Ajout de la route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-profile" element={<EditProfile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/profile" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;