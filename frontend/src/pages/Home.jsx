import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main className="min-h-[525px] flex flex-col flex-grow justify-center bg-[#ccdfcd] bg-[url('/images/showcase_image.jpg')] bg-no-repeat bg-center bg-cover bg-blend-luminosity text-[#2ABF7A] lg:pl-[90px]">
        <section className="max-w-[500px]">
          <h2 className="text-2xl font-light text-white mb-2">Libérate del TOC y maneja tu ansiedad</h2>
          <div className="bg-white opacity-80 rounded-xl p-2">
            <p className="text-xl text-justify font-medium text-[#2ABF7A] my-2 leading-tight">
              Regístrate y usa gratis nuestra <Link to="/register" className="text-[#2AB7FA] hover:text-[#2198cf] hover:text-xl">herramienta de registro mytocApp</Link> para llevar un control de tu TOC diario, pudiendo complementarlo además con citas presenciales u online con psicólogos especializados.
            </p>
            <p className="text-xl text-justify font-medium text-[#2ABF7A] my-2">
              Porque eres TÚ quien debe dirigir su vida y no el TOC, da el paso. <Link to="/register" className="text-[#2AB7FA] hover:text-[#2198cf] hover:text-xl">¡No estás sol@!</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Arrow floating button to get up */}
      <div id="container-button-up">
        <div>
          <a href="#header-page">&#8593;</a>
        </div>
      </div>

      <div class="lower-container">
        <h2 className="text-3xl text-center font-light text-[#2ABF7A] my-12">Algunos datos y estadísticas</h2>
        <section class="statistics">
          <div class="statistics_container">
            <h2 className="w-60 text-3xl font-light text-center text-[#2AB7FA] mb-4">70 millones de personas en el mundo sufren TOC</h2>
            <div id="statistics_worldwide" class="stats_subcontainer"></div>
          </div>
          <div class="statistics_container">
            <h2 className="w-60 text-3xl font-light text-center text-[#2AB7FA] mb-4">Más de 300.000 personas sólo en España</h2>
            <div id="statistics_spain" class="stats_subcontainer"></div>
          </div>
          <div class="statistics_container">
            <h2 className="w-60 text-3xl font-light text-center text-[#2AB7FA] mb-4">Un 50% mejora los síntomas</h2>
            <div id="statistics_recovery" class="stats_subcontainer"></div>
          </div>
        </section>

        <h2 className="text-3xl text-center font-light text-[#2ABF7A] mt-18 mb-12">Testimonios reales</h2>
        <section className="grid mb-8 border border-gray-200 rounded-lg shadow-xs md:mb-12 md:grid-cols-2 bg-white">
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
              <h3 className="text-lg font-semibold text-[#2AB7FA]">Atendida por ITEGRA Psicología</h3>
              <p className="my-4" lang="es">"Al principio me daba vergüenza, no me atrevía a reconocer mi problema, pero ahora me alegro mucho de haber dado el paso"</p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img className="rounded-full w-12 h-auto" src="/images/person1testimonial.jpg" alt="Imagen de una paciente" />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Claudia</div>
                <div className="text-sm text-gray-500">6 meses de terapia</div>
              </div>
            </figcaption>    
          </figure>
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
              <h3 className="text-lg font-semibold text-[#2AB7FA]">Atendido por Asociación TOC Granada</h3>
              <p className="my-4" lang="es">"He aprendido a manejar mejor mi ansiedad y he ganado en calidad de vida. ¡Ahora me arrepiento de no haber pedido ayuda antes!"</p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img className="rounded-full w-12 h-auto" src="/images/person2testimonial.jpg" alt="Imagen de un paciente" />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Julián</div>
                <div className="text-sm text-gray-500">3 meses de terapia</div>
              </div>
            </figcaption>    
          </figure>
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
              <h3 className="text-lg font-semibold text-[#2AB7FA]">Atendida por NB Psicología</h3>
              <p className="my-4" lang="es">"Realmente recomiendo la herramienta de registro online de MyTOC complementado con terapia; tomas más conciencia del problema y es muy útil"</p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img className="rounded-full w-12 h-auto" src="/images/person3testimonial.jpg" alt="Imagen de una paciente" />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Estefanía</div>
                <div className="text-sm text-gray-500">1 mes de terapia</div>
              </div>
            </figcaption>    
          </figure>
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
              <h3 className="text-lg font-semibold text-[#2AB7FA]">Atendida por Zoraida Rodríguez Ctro. Psicología</h3>
              <p className="my-4" lang="es">"Tenía multitud de TOC diferentes y era desesperante. Llegó un momento en que ya no podía ni disimular y estaba afectando a mi familia. ¡Gracias MyTOC!"</p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img className="rounded-full w-12 h-auto" src="/images/person4testimonial.jpg" alt="Imagen de una paciente" />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Raquel</div>
                <div className="text-sm text-gray-500">9 meses de terapia</div>
              </div>
            </figcaption>    
          </figure>
        </section>
      </div>
    </>
  );
};

export default Home;
