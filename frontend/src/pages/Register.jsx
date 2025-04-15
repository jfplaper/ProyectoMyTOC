import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  // Si no funciona con async probar sin él
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameInput.trim();
    const password = passwordInput.trim();
    const email = emailInput.trim();
    if (!username || !password || (password.length < 6) || !email) {
      alert("Se produjo un error. ¿Rellenaste correctamente todos los campos?");
      return;
    }
    register(username, password, email);
    navigate("/login");
  };

  return (
    <div className="min-h-[550px] bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <form className="max-w-md mx-auto bg-white p-6 rounded-xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#2ABF7A]">Registro de usuario</h1>
            <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" type="text"
              placeholder="Nombre de usuario" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
            <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" type="password"
              placeholder="Password (mín. 6 dígitos)" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            <input className="p-2 mb-4 border-gray-200 border rounded-lg focus:outline-[#2AB7FA]" type="email"
              placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            <button className="w-full bg-[#2AB7FA] text-white text-xl rounded p-4 mb-6 hover:bg-blue-700 cursor-pointer" type="submit">
              Registrarme
            </button>
            <Link className="font-bold center mx-auto" to="/">
              <u>Volver al inicio</u>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
