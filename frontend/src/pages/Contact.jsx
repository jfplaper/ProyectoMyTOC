import React from 'react';
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <main className="min-h-screen flex justify-start items-center">
      <section className="h-full w-2xl my-4 mx-auto">
        <img className="w-full h-auto rounded-xl" src="/images/contact_image.jpg" alt="Imagen de dos personas dándose la mano" />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-light text-[#2ABF7A] my-4">INFORMACIÓN DE CONTACTO</h2>
          <p className="text-xl text-justify">
            Para informarte del funcionamiento de nuestra aplicación web de registros de TOC, <Link to="/" className="text-[#2AB7FA] underline hover:text-[#2198cf] hover:text-xl">mytocAPP</Link>, pulsa en el enlace. Si lo que buscas es 
            consultar nuestro foro, los eventos o el listado de clínicas no es necesario registrarse, salvo si deseas escribir en el foro.
          </p><br/>
          <p className="text-xl text-justify">
            En el caso de padecer TOC te invitamos férreamente a registrarte, pues creemos que sería bueno para ti guardar tus datos y llevar así 
            un registro diario del TOC o los TOC que padezcas. ¡No pierdes nada por probar!
          </p><br/>
          <h3 className="text-2xl font-light text-[#2AB7FA] my-4">Localízanos</h3>
          <div className="flex gap-3">
            <i className="fa fa-map-marker-alt text-[#2AB7FA]"></i>
            <p>C/ Albondón, 12, Ronda, 18003 Granada</p>
          </div>
          <h3 className="text-2xl font-light text-[#2AB7FA] my-4">O mándanos un email:</h3>
          <div className="flex gap-3">
            <i className="fa fa-at text-[#2AB7FA]"></i>
            <p>mytoc@gmail.com</p><br/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
