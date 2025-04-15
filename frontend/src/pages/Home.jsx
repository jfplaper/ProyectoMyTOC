import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main className="min-h-[525px] flex flex-col flex-grow justify-center bg-[#ccdfcd] bg-[url('/images/showcase_image.jpg')] bg-no-repeat bg-center bg-cover bg-blend-luminosity text-[#2ABF7A] lg:pl-[90px]">
        <section className="max-w-[500px]">
          <h2 className="text-3xl font-light text-white mb-2">Libérate del TOC y maneja tu ansiedad</h2>
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
        <section class="statistics">
          <div class="statistics_container">
            <h2>70 millones de personas en el mundo sufren TOC</h2>
            <div id="statistics_worldwide" class="stats_subcontainer"></div>
          </div>
          <div class="statistics_container">
            <h2>Más de 300.000 personas sólo en España</h2>
            <div id="statistics_spain" class="stats_subcontainer"></div>
          </div>
          <div class="statistics_container">
            <h2>Un 50% mejora los síntomas</h2>
            <div id="statistics_recovery" class="stats_subcontainer"></div>
          </div>
        </section>

        <section class="testimonials">
          <div class="testimonials-card">
            <div class="testimonials-circle-name">
              <img src="/images/person1testimonial.jpg" alt="Imagen de un o una paciente" />
              <h3>Claudia</h3>
            </div>
            <p lang="es">Al principio me daba vergüenza, no me atrevía a reconocer mi problema, pero ahora me 
                alegro mucho de haber dado el paso</p>
          </div>
          <div class="testimonials-card">
            <div class="testimonials-circle-name">
              <img src="/images/person2testimonial.jpg" alt="Imagen de un o una paciente" />
              <h3>Julian</h3>
            </div>
            <p lang="es">He aprendido a manejar mejor mi ansiedad y he ganado en calidad de vida. ¡Ahora me 
                arrepiento de no haber pedido ayuda antes!</p>
          </div>
          <div class="testimonials-card">
            <div class="testimonials-circle-name">
              <img src="/images/person3testimonial.jpg" alt="Imagen de un o una paciente" />
              <h3>Estefanía</h3>
            </div>
            <p lang="es">Realmente recomiendo la herramienta de registro online de MyTOC complementado con 
                terapia; tomas más conciencia del problema y es muy útil</p>
          </div>
          <div class="testimonials-card">
            <div class="testimonials-circle-name">
              <img src="/images/person4testimonial.jpg" alt="Imagen de un o una paciente" />
              <h3>Raquel</h3>
            </div>
            <p lang="es">Tenía multitud de TOC diferentes y era desesperante. Llegó un momento en que ya no 
                podía ni disimular y estaba afectando a mi familia. ¡Gracias MyTOC!</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
