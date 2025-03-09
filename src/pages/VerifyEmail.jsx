import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:6540/api/v1/auth/verify-email/${token}`, {
          method: "GET", // ✅ Utilisation de PUT pour la vérification d'email
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        alert("Email vérifié avec succès !");
        navigate("/login"); // ✅ Redirige vers la page de connexion
      } catch (error) {
        console.error("Erreur de vérification :", error);
        alert("Échec de la vérification de l'email.");
        navigate("/register");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Vérification en cours...</h2>
        <p className="text-gray-600 text-center">Merci de patienter.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;