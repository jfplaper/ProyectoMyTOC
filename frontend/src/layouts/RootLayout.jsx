import React from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Header */}
      <header id="header-page" className="w-full flex justify-between items-center px-12 py-4">
        <h2 className="text-2xl text-[#2ABF7A] font-light my-2 leading-tight">My TOC</h2>
        <img className="w-12 h-auto" src="/images/logotype.png" alt="Logo del sitio web My TOC" />
      </header>

      {/* Navbar */}
      <nav className="w-full min-h-10 flex flex-wrap justify-between items-center bg-[#2AB7FA] sticky top-0 z-10 mx-auto px-8 shadow-lg">
        <ul className="flex">
          <li className="list-none">
            <Link to="/" className="text-xl text-white no-underline mx-2.5 p-2.5 hover:text-black hover:border-b-2 hover:border-[#2ABF7A]">
              Inicio
            </Link>
          </li>
          <li className="list-none">
            <Link to="/clinics" className="text-xl text-white no-underline mx-2.5 p-2.5 hover:text-black hover:border-b-2 hover:border-[#2ABF7A]">
              Clínicas
            </Link>
          </li>
          <li className="list-none">
            <Link to="/forum" className="text-xl text-white no-underline mx-2.5 p-2.5 hover:text-black hover:border-b-2 hover:border-[#2ABF7A]">
              Foro
            </Link>
          </li>
          <li className="list-none">
            <Link to="/events" className="text-xl text-white no-underline mx-2.5 p-2.5 hover:text-black hover:border-b-2 hover:border-[#2ABF7A]">
              Eventos
            </Link>
          </li>
          <li className="list-none">
            <Link to="/contact" className="text-xl text-white no-underline mx-2.5 p-2.5 hover:text-black hover:border-b-2 hover:border-[#2ABF7A]">
              Contacto
            </Link>
          </li>
          {isAuthenticated && (
          <li className="list-none">
            <Link to="/mytocappweb" className="text-xl text-white no-underline mx-2.5 p-2.5 hover:text-black hover:border-b-2 hover:border-[#2ABF7A]">
              mytocApp web
            </Link>
          </li>
          )}
        </ul>
        {!isAuthenticated ? (
        <div className="flex items-center">
          <ul className="flex">
            <li className="list-none">
              <Link to="/login" className="text-xl text-gray-800 no-underline mx-2.5 p-2.5 hover:text-white hover:border-b-2 hover:border-gray-800">
                Iniciar sesión
              </Link>
            </li>
            <li className="list-none">
              <Link to="/register" className="text-xl text-gray-800 no-underline mx-2.5 p-2.5 hover:text-white hover:border-b-2 hover:border-gray-800">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
        ) : (
        <div className="flex items-center">
          <Link to="/profile" className="hover:text-[#2AB7FA] hover:border-b-0">
            <img className="w-8 h-auto rounded-2xl" src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${user.image}`} alt={`Imagen del usuario ${user.username}`} />
          </Link>
          <button className="text-xl text-gray-800 no-underline mx-2.5 p-2.5 hover:text-white hover:border-b-2 hover:border-gray-800" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
        )}
      </nav>

      {/* Main content */}
      <Outlet />
      
      {/* Footer */}
      <footer className="h-full bg-[#2ABF7A] p-2 px-0.5">
        <div className="w-full flex justify-between">
          <div className="w-full flex-grow flex flex-col justify-center items-center border-r-2 border-black">
            <h1 className="text-3xl font-semibold my-2.5 leading-tight">My TOC</h1>
            <p className="text-lg my-2.5">Copyright &copy; 2025</p>
          </div>
          <nav className="w-full flex-grow my-4">
            <ul className="w-full flex flex-col items-center">
              <li className="list-none"><a href="#" className="text-xl text-white no-underline hover:text-black hover:border-b-0 hover:border-[#2ABF7A]">Inicio</a></li>
              <li className="list-none"><a href="#" className="text-xl text-white no-underline hover:text-black hover:border-b-0 hover:border-[#2ABF7A]">Clínicas</a></li>
              <li className="list-none"><a href="#" className="text-xl text-white no-underline hover:text-black hover:border-b-0 hover:border-[#2ABF7A]">Foro</a></li>
              <li className="list-none"><a href="#" className="text-xl text-white no-underline hover:text-black hover:border-b-0 hover:border-[#2ABF7A]">Eventos</a></li>
              <li className="list-none"><a href="#" className="text-xl text-white no-underline hover:text-black hover:border-b-0 hover:border-[#2ABF7A]">Contacto</a></li>
            </ul>
          </nav>
          <div className="w-full flex-grow flex flex-wrap justify-center items-center border-l-2 border-black space-x-2">
            <a href="#" className="text-lg text-white no-underline p-1 hover:text-black hover:border-b-0 hover:border-[#2ABF7A]"><em className="fab fa-twitter fa-2x"></em></a>
            <a href="#" className="text-lg text-white no-underline p-1 hover:text-black hover:border-b-0 hover:border-[#2ABF7A]"><em className="fab fa-instagram fa-2x"></em></a>
            <a href="#" className="text-lg text-white no-underline p-1 hover:text-black hover:border-b-0 hover:border-[#2ABF7A]"><em className="fab fa-facebook fa-2x"></em></a>
            <a href="#" className="text-lg text-white no-underline p-1 hover:text-black hover:border-b-0 hover:border-[#2ABF7A]"><em className="fab fa-whatsapp fa-2x"></em></a>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default RootLayout;
