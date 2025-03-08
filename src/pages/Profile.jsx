import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Ajouter un état de chargement
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:6540/api/v1/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
  
        setUser(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du profil:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
  
    fetchProfile();
  }, []); // ✅ Assure-toi que `[]` est utilisé pour éviter la boucle infinie
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Mon Profil</h2>
        {loading ? ( // ✅ Vérifier si les données sont encore en chargement
          <p className="text-center text-gray-500">Chargement...</p>
        ) : user ? (
          <div className="mt-4 text-center">
            <p className="text-gray-700 font-semibold">Nom: {user.name}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Utilisateur introuvable</p>
        )}
      </div>
    </div>
  );
};

export default Profile;