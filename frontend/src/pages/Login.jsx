import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [usernameLoginInput, setUsernameLoginInput] = useState("");
    const [passwordLoginInput, setPasswordLoginInput] = useState("");

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const username = usernameLoginInput.trim();
        const password = passwordLoginInput.trim();
        if (!username || !password) {
            alert("Fallo al iniciar sesión. ¿Rellenaste correctamente todos los campos?");
            return;
        }
        login(username, password);
        navigate("/");
    };

    return (
        <div className="min-h-[500px] bg-gray-200 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <form className="max-w-md mx-auto bg-white rounded-xl" onSubmit={handleSubmitLogin}>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold mb-6 text-center text-[#2ABF7A]">Login</h1>
                        <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" 
                            type="text" placeholder="Nombre de usuario" 
                            value={usernameLoginInput} onChange={(e) => setUsernameLoginInput(e.target.value)} />
                        <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" 
                            type="password" placeholder="Password" 
                            value={passwordLoginInput} onChange={(e) => setPasswordLoginInput(e.target.value)} />
                        <button className="w-full bg-[#2AB7FA] text-white text-xl rounded p-4 mb-6 hover:bg-blue-700 cursor-pointer" 
                            type="submit">Iniciar sesión</button>
                        <Link to="/register" className="font-bold center mx-auto">
                            *Si no te has registrado, 
                            <u className="text-[#2ABF7A] ms-1.5">hazlo aquí</u>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
