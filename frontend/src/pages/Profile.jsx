import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { House } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
    const navigate = useNavigate();
    const { user, updateProfilePassword, updateProfileEmail, updateProfileAll } = useAuth();
    const [emailEditProfileInput, setEmailEditProfileInput] = useState("");
    const [passwordEditProfileInput, setPasswordEditProfileInput] = useState("");
    const [imageEditProfileInput, setImageEditProfileInput] = useState("");
    // Even if form fields are required, errors are handled more safely with error and setError
    const [error, setError] = useState("");

    const handleSubmitEditProfile = async (e) => {
        e.preventDefault();
        setError("");
        const email = emailEditProfileInput.trim();
        const password = passwordEditProfileInput.trim();
        const image = imageEditProfileInput;

        if (!email && !password) {
            setError("Por favor, completa al menos uno de los campos correctamente.");
            return;
        } else if (!email && password && (password.length < 6)) {
            setError("El password debe tener como mínimo 6 dígitos");
            return;
        } else if (!email && password && (password.length >= 6)) {
            try {
                await updateProfilePassword(password);
                navigate("/profile");
            } catch (err) { setError(err.message || "Error al modificar password. Inténtalo de nuevo."); }
        } else if (email && !password) {
            try {
                await updateProfileEmail(email);
                navigate("/profile");
            } catch (err) { setError(err.message || "Error al modificar email. Inténtalo de nuevo."); }
        } else if (email && password && (password.length < 6)) {
            setError("El password debe tener como mínimo 6 dígitos");
            return;
        } else if (email && password && (password.length >= 6)) {
            try {
                await updateProfileAll(email, password);
                navigate("/profile");
            } catch (err) { setError(err.message || "Error al modificar password y email. Inténtalo de nuevo."); }
        }
        navigate("/");
    };

    return (
        <>
            <div className="flex items-center gap-2 mt-4 ml-4">
                <Link to="/" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                    <House className="w-6 h-6 text-[#2AB7FA] hover:text-blue-700" />
                </Link>
                /
                <Link to="/profile" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                    Perfil de usuario
                </Link>
            </div>

            <div className="min-h-screen flex items-center justify-center my-12 p-4">
                <div className="bg-white w-full max-w-md p-8 border-2 border-gray-300 rounded-2xl shadow-xl 
                    transform transition-transform hover:scale-105 animate-fadeIn">
                    <h1 className="text-3xl font-bold text-center mb-6 text-[#2ABF7A]">
                        PERFIL DE {(user.username).toUpperCase()}
                    </h1>
                    {error && (
                    <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg border border-red-200">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86A2 2 0 0021 17.93V6.07A2 2 0 0019.93 5H5.07A2 2 0 005 6.07v11.86A2 2 0 005.07 19z" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                    )}
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-24 h-auto mb-3 rounded-full shadow-lg" 
                            src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${user.image}`} 
                            alt={`Imagen del usuario ${user.username}`} />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{user.username}</h5>
                        <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                    <h1 className="text-xl font-bold text-center mt-6 mb-6 text-[#2ABF7A]">Editar</h1>
                    <form className="space-y-4" onSubmit={handleSubmitEditProfile}>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                            type="email" placeholder="Nuevo Email" 
                            value={emailEditProfileInput} 
                            onChange={(e) => setEmailEditProfileInput(e.target.value)} />
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                            type="password" placeholder="Nuevo Password (mín. 6 dígitos)" 
                            value={passwordEditProfileInput} 
                            onChange={(e) => setPasswordEditProfileInput(e.target.value)} />
                        <label className="text-[#2AB7FA]">Subir nueva imagen (png, jpg o jpeg):</label>
                        <input className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                            type="file" 
                            value={imageEditProfileInput} 
                            onChange={(e) => setImageEditProfileInput(e.target.value)} />
                        <button className="w-full bg-[#2AB7FA] text-white py-3 rounded-lg font-semibold 
                            hover:bg-blue-700 cursor-pointer transition-shadow shadow-md hover:shadow-lg" 
                            type="submit">Modificar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
