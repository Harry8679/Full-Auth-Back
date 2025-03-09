import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // ✅ Récupère `user` et `logout` depuis le contexte

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          EmarhAuth
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-white flex items-center space-x-2 hover:text-gray-200 transition"
              >
                <FaUserCircle size={24} />
                <span>Profil</span>
              </Link>
              <Link
                to="/update-profile"
                className="text-white font-semibold hover:text-gray-200 transition"
              >
                Modifier Profil
              </Link>
              <Link
                to="/change-password"
                className="text-white font-semibold hover:text-gray-200 transition"
              >
                Modifier mot de passe
              </Link>

              <button
                onClick={logout} // ✅ Utilise la fonction logout depuis le contexte
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white font-semibold hover:text-gray-200 transition"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;