import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmationPasswordInput, setConfirmationPasswordInput] = useState("");
    // Even if form fields are required, errors are handled more safely with error and setError
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const username = usernameInput.trim();
        const email = emailInput.trim();
        const password = passwordInput.trim();
        const confirmationPassword = confirmationPasswordInput.trim();
        if (!username || !email || !password || (password.length < 6) 
            || !confirmationPassword || (confirmationPassword.length < 6)) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }
        if (password !== confirmationPassword) {
            setError('Deben coincidir ambos password.');
            return;
        }
        try {
            await register(username, password, email);
            navigate("/login");
        } catch (err) {
            setError(err.message || 'Error al registrarte. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transform transition-transform hover:scale-105 animate-fadeIn">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#2ABF7A]">Registro de usuario</h1>
                {error && (
                <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg border border-red-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86A2 2 0 0021 17.93V6.07A2 2 0 0019.93 5H5.07A2 2 0 005 6.07v11.86A2 2 0 005.07 19z" />
                    </svg>
                    <span className="text-sm">{error}</span>
                </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                        type="text" placeholder="Nombre de usuario *" required 
                        value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                        type="email" placeholder="Email *" required 
                        value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                        type="password" placeholder="Password * (mín. 6 dígitos)" minLength={6} required 
                        value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AB7FA] transition" 
                        type="password" placeholder="Confirma password *" minLength={6} required 
                        value={confirmationPasswordInput} onChange={(e) => setConfirmationPasswordInput(e.target.value)} />
                    <button className="w-full bg-[#2AB7FA] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-shadow shadow-md hover:shadow-lg" 
                        type="submit">Registrarme</button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-[#2ABF7A] hover:underline">Inicia sesión</Link>
                </p>
                <p className="text-center mt-4">
                    <Link to="/" className="text-gray-500 hover:text-gray-900 text-sm">Volver al inicio</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
