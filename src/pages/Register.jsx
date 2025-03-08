import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("http://localhost:6540/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur lors de l'inscription");
      
      alert("Inscription réussie ! Vérifiez votre email.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Inscription</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            S'inscrire
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Déjà inscrit ? <a href="/login" className="text-blue-500 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;