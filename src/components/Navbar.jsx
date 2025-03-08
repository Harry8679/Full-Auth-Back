import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // À remplacer avec une auth réelle

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          EmarhAuth
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white flex items-center space-x-2">
                <FaUserCircle size={24} />
                <span>Profil</span>
              </Link>
              <Button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100"
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
