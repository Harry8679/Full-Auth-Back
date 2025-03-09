import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const passwordsFilled = formData.password.length > 0 && formData.confirmPassword.length > 0;
  const passwordsMatch = passwordsFilled && formData.password === formData.confirmPassword;
  const passwordBorderColor = passwordsFilled
    ? passwordsMatch
      ? "border-green-500"
      : "border-red-500"
    : "border-gray-300";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("Les mots de passe ne correspondent pas.", { position: "top-right" });
      return;
    }

    try {
      const response = await fetch("http://localhost:6540/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur lors de l'inscription");

      toast.success("Inscription réussie ! Vérifiez votre email.", { position: "top-right" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message, { position: "top-right" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Inscription</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border ${passwordBorderColor} rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <button type="button" className="absolute top-3 right-3 text-gray-500" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative mt-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border ${passwordBorderColor} rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <button type="button" className="absolute top-3 right-3 text-gray-500" onClick={toggleConfirmPassword}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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
