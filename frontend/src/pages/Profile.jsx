import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
    const navigate = useNavigate();
    const { user, updateProfilePassword, updateProfileEmail, updateProfileAll } = useAuth();
    const [emailEditProfileInput, setEmailEditProfileInput] = useState("");
    const [passwordEditProfileInput, setPasswordEditProfileInput] = useState("");
    const [imageEditProfileInput, setImageEditProfileInput] = useState("");

    const handleSubmitEditProfile = (e) => {
        e.preventDefault();
        const email = emailEditProfileInput.trim();
        const password = passwordEditProfileInput.trim();
        const image = imageEditProfileInput;
        if (!email && !password) {
            alert("Se produjo un error. ¿Rellenaste correctamente al menos uno de los campos?");
            return;
        } else if (!email && password && (password.length < 6)) {
            alert("Se produjo un error. El password debe tener como mínimo 6 dígitos");
            return;
        } else if (!email && password && (password.length >= 6)) {
            updateProfilePassword(password);
        } else if (email && !password) {
            updateProfileEmail(email);
        } else if (email && password && (password.length < 6)) {
            alert("Se produjo un error. El password debe tener como mínimo 6 dígitos");
            return;
        } else if (email && password && (password.length >= 6)) {
            updateProfileAll(email, password);
        }
        navigate("/");
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">
                PERFIL DE {(user.username).toUpperCase()}
            </h2>
            <div className="w-full mx-auto my-4 max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex flex-col items-center pt-5 pb-10">
                    <img className="w-24 h-auto mb-3 rounded-full shadow-lg" 
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${user.image}`} 
                        alt={`Imagen del usuario ${user.username}`} />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{user.username}</h5>
                    <span className="text-sm text-gray-500">{user.email}</span>
                    <form className="max-w-md mt-6 mx-auto bg-white rounded-xl" onSubmit={handleSubmitEditProfile}>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold mb-6 text-center text-[#2ABF7A]">Editar</h1>
                            <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" 
                                type="email" placeholder="Nuevo Email" 
                                value={emailEditProfileInput} 
                                onChange={(e) => setEmailEditProfileInput(e.target.value)} />
                            <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" 
                                type="password" placeholder="Nuevo Password (mín. 6 dígitos)" 
                                value={passwordEditProfileInput} 
                                onChange={(e) => setPasswordEditProfileInput(e.target.value)} />
                            <label className="text-[#2AB7FA]">Subir nueva imagen (png, jpg o jpeg):</label>
                            <input className="p-2 mb-4 border-[#2AB7FA] border rounded-lg" 
                                type="file" 
                                value={imageEditProfileInput} 
                                onChange={(e) => setImageEditProfileInput(e.target.value)} />
                            <button className="w-full bg-[#2AB7FA] text-white text-xl rounded p-4 hover:bg-blue-700 cursor-pointer" 
                                type="submit">Modificar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
