import React from 'react';
import { Link } from "react-router-dom";

const MyTocAppManual = () => {
  return (
    <main className="min-h-screen flex justify-start items-center">
      <section className="h-full w-2xl my-4 mx-auto">
        <img className="w-full h-auto border border-gray-700 rounded-xl" src="/images/manual_image.jpg" alt="Imagen visual explicativa de MyTOCApp Web" />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-light text-[#2ABF7A] my-4">MANUAL DE USO DE LA APP WEB MYTOC</h2>
          <h3 className="text-2xl font text-[#2AB7FA] mt-4 mb-6">¡Es súper fácil! Para ello tienes que:</h3>
          <ol className="list-decimal">
            <li className="text-lg mb-6">
              <Link to="/register" className="text-[#2AB7FA] underline hover:text-blue-700 me-1.5">Registrarte</Link>
              con tu nombre de usuario, password y email<i className="fa fa-pencil-alt text-[#2AB7FA] ms-4"></i>
            </li>
            <li className="text-lg mb-6">
              <Link to="/login" className="text-[#2AB7FA] underline hover:text-blue-700 me-1.5">Iniciar sesión</Link>
              y buscar la opción del menú principal mytocApp web<i className="fa fa-arrow-right text-[#2AB7FA] ms-4"></i>
            </li>
            <li className="text-lg mb-6">Buscar el TOC (o TOCs) que tienes y hacer clic o pulsar el botón de incremento en 1 cada vez que realices una compulsión o acto obsesivo compulsivo
              <i className="fa fa-plus text-[#2AB7FA] ms-4"></i>
            </li>
            <li className="text-lg mb-6">¡Y ya está! Puedes hacer un seguimiento del recuento diario, mensual y anual
              <i className="fa fa-clipboard text-[#2AB7FA] ms-4"></i>
            </li>
          </ol>
          <h3 className="text-2xl font text-[#2AB7FA] mt-4 mb-6">Recomendación si usas teléfono móvil:</h3>
          <ul className="list-disc">
            <li className="text-lg">Mantén abierta la sesión y deja el navegador abierto con la página web directamente o en segundo plano. Así el acceso será más rápido, cómodo y sin necesidad de descargar una versión de aplicación móvil (también estamos trabajando en ello) que te ocupe memoria en el teléfono</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default MyTocAppManual;
