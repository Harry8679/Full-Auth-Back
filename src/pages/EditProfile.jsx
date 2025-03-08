import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:6540/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, [navigate, token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:6540/api/v1/auth/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profil mis à jour avec succès !");
      navigate("/profile");
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Modifier le profil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;