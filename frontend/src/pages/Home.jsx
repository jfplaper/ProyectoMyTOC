import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Activate the animation when user see the statistics section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = document.querySelectorAll('.stats-bar');
            bars.forEach(bar => {
              bar.classList.add('animate');
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
    
    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  return (
    <>
      <main className="min-h-[525px] flex flex-col flex-grow justify-center bg-[#ccdfcd] bg-[url('/images/showcase_image.jpg')] bg-no-repeat bg-center bg-cover bg-blend-luminosity text-[#2ABF7A] lg:pl-[90px]">
        <section className="max-w-[500px]">
          <h2 className="text-[25px] font-light text-white mb-2">Libérate del TOC y maneja tu ansiedad</h2>
          <div className="bg-white opacity-80 rounded-xl p-2">
            <p className="text-xl text-justify font-medium text-[#2ABF7A] my-2 leading-tight">
              Regístrate y usa gratis nuestra <Link to="/mytocappmanual" className="text-[#2AB7FA] hover:text-blue-700">herramienta de registro mytocApp</Link> para llevar un control de tu TOC diario, pudiendo complementarlo además con citas presenciales u online con psicólogos especializados.
            </p>
            <p className="text-xl text-justify font-medium text-[#2ABF7A] my-2">
              Porque eres TÚ quien debe dirigir su vida y no el TOC, da el paso. <Link to="/forum" className="text-[#2AB7FA] hover:text-blue-700">¡No estás sol@!</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Cookies container */}
      {!cookiesAccepted && (
        <div className="fixed bottom-0 left-0 w-full h-auto z-50 bg-gray-100 border-t border-gray-800 rounded-t-2xl shadow-lg p-4">
          <h3 className="text-sm text-gray-900 font-semibold mb-2">Consentimiento de cookies</h3>
          <p className="text-sm text-[#2AB7FA] leading-tight mb-2">
            Utilizamos cookies para prestar, mantener y mejorar nuestros servicios, además de por motivos de seguridad. 
            Al hacer clic en "Aceptar todo", aceptas nuestra&nbsp;
            <Link to="/" className="text-sm underline text-gray-700 hover:text-gray-900">política de cookies</Link>.
          </p>
          <button className="w-36 text-sm border border-gray-800 rounded-lg py-2 font-medium bg-[#2AB7FA] hover:bg-blue-700"
            onClick={() => setCookiesAccepted(true)}>Aceptar todo</button>
        </div>
      )}

      {/* Arrow floating button to get up */}
      <div className="flex justify-end sticky top-[360px] z-10 my-1.5 mx-6">
        <div className="w-[50px] h-[50px] bg-[#2AB7FA] rounded-[50px] flex justify-center items-center">
          <a href="#header-page" className="text-5xl font-[500] text-black; no-underline">&#8593;</a>
        </div>
      </div>

      <div className="my-0 mx-auto max-w-[1200px] overflow-visible">
        <h2 className="text-3xl text-center font-light text-[#2ABF7A] my-12">Algunos datos y estadísticas</h2>
        <section className="statistics-section w-full flex justify-between items-end my-12 mx-0 py-0 px-5">
          <div className="statistics-container w-full flex flex-col justify-end items-center">
            <h2 className="w-60 text-3xl font-light text-center text-[#2AB7FA] mb-4">
              70 millones de personas en el mundo sufren TOC
            </h2>
            <div id="statistics_worldwide" className="stats-bar worldwide"></div>
          </div>
          <div className="statistics-container w-full flex flex-col justify-end items-center">
            <h2 className="w-60 text-3xl font-light text-center text-[#2AB7FA] mb-4">
              Más de 300.000 personas sólo en España
            </h2>
            <div id="statistics_spain" className="stats-bar spain"></div>
          </div>
          <div className="statistics-container w-full flex flex-col justify-end items-center">
            <h2 className="w-60 text-3xl font-light text-center text-[#2AB7FA] mb-4">
              Un 50% mejora los síntomas
            </h2>
            <div id="statistics_recovery" className="stats-bar recovery"></div>
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
