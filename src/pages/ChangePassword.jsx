import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // ✅ Récupérer le token
      const response = await fetch("http://localhost:6540/api/v1/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur lors du changement de mot de passe");

      toast.success("Mot de passe mis à jour avec succès !");
      navigate("/profile"); // ✅ Redirige vers le profil après succès
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Modifier le mot de passe</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Ancien mot de passe"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirmer le nouveau mot de passe"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;