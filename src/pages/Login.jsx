import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Utilisation du contexte

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:6540/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur lors de la connexion");

      // ✅ Stocker les données dans le contexte
      login(data.user, data.token);
      
      toast.success("Connexion réussie !", { position: "top-right" });

      // ✅ Redirige après connexion
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message, { position: "top-right" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;