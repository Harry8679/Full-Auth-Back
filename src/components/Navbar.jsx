import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Simulation de la connexion (vérification du token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Suppression du token
    setIsLoggedIn(false);
    navigate("/login"); // Redirection vers la connexion
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EmarhAuth
        </Link>

        {/* Liens dynamiques */}
        <div className="space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-500">
                Profil
              </Link>
              <Link to="/edit-profile" className="text-gray-700 hover:text-blue-500">
                Modifier Profil
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Connexion
              </Link>
              <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
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