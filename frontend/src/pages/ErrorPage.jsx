import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-2xl text-center">
                <div className="mb-8">
                    <img className="mx-auto" width="200" height="auto" src="/images/404error.png"
                        alt="Imagen para error 404" />
                    <h2 className="text-2xl font-semibold text-red-500 mb-2">Error 404</h2>
                    <p className="text-gray-700 mb-6">
                        {error?.message || "La página que buscas no existe"}
                    </p>
                </div>
                <div className="space-y-4">
                    <button className="w-full bg-[#2ABF7A] text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200" 
                        onClick={() => navigate(-1)}>Volver</button>
                    <button className="w-full bg-[#2AB7FA] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200" 
                        onClick={() => navigate("/")}>Ir al inicio</button>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
