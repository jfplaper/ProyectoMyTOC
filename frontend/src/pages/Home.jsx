import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const statistics = [
    { label: "70M+", subtitle: "personas en el mundo", key: "worldwide" },
    { label: "300K+", subtitle: "solo en España", key: "spain" },
    { label: "50%", subtitle: "mejora síntomas", key: "recovery" }
];

const testimonials = [
    {
        name: "Claudia",
        text: "Al principio me daba vergüenza, no me atrevía a reconocer mi problema, pero ahora me alegro mucho de haber dado el paso",
        img: "/images/person1testimonial.jpg",
        role: "6 meses de terapia",
        provider: "Atendida por ITEGRA Psicología",
    },
    {
        name: "Julián",
        text: "He aprendido a manejar mejor mi ansiedad y he ganado en calidad de vida. ¡Ahora me arrepiento de no haber pedido ayuda antes!",
        img: "/images/person2testimonial.jpg",
        role: "3 meses de terapia",
        provider: "Atendido por Asociación TOC Granada",
    },
    {
        name: "Estefanía",
        text: "Realmente recomiendo la herramienta de registro online de MyTOC complementado con terapia; tomas más conciencia del problema y es muy útil",
        img: "/images/person3testimonial.jpg",
        role: "1 mes de terapia",
        provider: "Atendida por NB Psicología",
    },
    {
        name: "Raquel",
        text: "Tenía multitud de TOC diferentes y era desesperante. Llegó un momento en que ya no podía ni disimular y estaba afectando a mi familia. ¡Gracias MyTOC!",
        img: "/images/person4testimonial.jpg",
        role: "9 meses de terapia",
        provider: "Atendida por Centro Zoraida Rodríguez",
    }
];

const Home = () => {
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const controls = useAnimation();

    const [selectedFirstQuestion, setSelectedFirstQuestion] = useState(null);
    const optionsFirstQuestion = ["Nada", "Menos de 1 hora al día o pensamientos ocasionales", 
        "1 a 3 horas al día o frecuentes", "Más de 3 y hasta 8 horas al día o presentación sumamente frecuente", 
        "Más de 8 horas al día o presentación casi constante"];
    const [selectedSecondQuestion, setSelectedSecondQuestion] = useState(null);
    const optionsSecondQuestion = ["Nada", "Ligera interferencia", "Interferencia media", 
        "Mucha interferencia", "Incapacitante"];
    const [selectedThirdQuestion, setSelectedThirdQuestion] = useState(null);
    const optionsThirdQuestion = ["Nada", "No son demasiado inquietantes", "Inquietantes, pero manejables", 
        "Sumamente inquietantes", "Inquietud casi constante e incapacitante"];
    
    const [current, setCurrent] = useState(0);
    const prevTestimonial = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    const nextTestimonial = () => setCurrent((prev) => (prev + 1) % testimonials.length);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) controls.start('visible');
                });
            },
            { threshold: 0.3 }
        );
        const statsSection = document.getElementById('stats-section');
        if (statsSection)
            observer.observe(statsSection);
        return () => statsSection && observer.unobserve(statsSection);
    }, [controls]);

    const renderTestResult = () => {
        if (selectedFirstQuestion && selectedSecondQuestion && selectedThirdQuestion) {
            if ((selectedFirstQuestion === "Nada" || selectedFirstQuestion === 
                "Menos de 1 hora al día o pensamientos ocasionales") && 
                (selectedSecondQuestion === "Nada" || 
                selectedSecondQuestion === "Ligera interferencia") && 
                (selectedThirdQuestion === "Nada" || 
                selectedThirdQuestion === "No son demasiado inquietantes")) {
                return (
                    <div className="flex justify-center items-center">
                        <p className="text-green-500">
                            <span className="text-black">Resultado: </span>TOC leve, pero no te confíes</p>
                    </div>
                );
            } else if (selectedFirstQuestion === "1 a 3 horas al día o frecuentes" && 
                selectedSecondQuestion === "Interferencia media" && 
                selectedThirdQuestion === "Inquietantes, pero manejables") {
                return (
                    <div className="flex justify-center items-center">
                        <p className="text-amber-500">
                            <span className="text-black">Resultado: </span>TOC moderado, debes afrontarlo cuanto antes</p>
                    </div>
                );
            } else {
                return (
                    <div className="flex justify-center items-center">
                        <p className="text-red-500">
                            <span className="text-black">Resultado: </span>TOC grave, pide ayuda de inmediato</p>
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex flex-col">
            {/* Hero section */}
            <section className="relative min-h-[75vh] md:h-screen bg-cover bg-center" 
                style={{ backgroundImage: "url('/images/showcase_image.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-green-600/30"></div>
                <div className="relative z-10 flex flex-col items-start justify-center h-full lg:pl-24 
                    p-4 md:p-8">
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4"
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}>
                        Libérate del TOC y maneja tu ansiedad
                    </motion.h1>
                    <motion.p className="text-base sm:text-lg max-w-full md:max-w-xl text-white mb-6" 
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}>
                        Regístrate y usa gratis nuestra 
                        <Link to="/mytocappmanual" className="hover:text-green-500 hover:font-bold ms-1">
                            herramienta de registro diario
                        </Link>
                        , complementable con citas presenciales u online. ¿Dudas aún? Inspírate 
                        <Link to="/inspiration" className="hover:text-green-500 hover:font-bold ms-1 underline">
                            aquí
                        </Link>.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <Link to="/register" className="px-5 py-2 sm:px-6 sm:py-3 bg-green-500 text-white 
                            rounded-lg font-medium hover:bg-green-600 transition text-center">
                            Comenzar
                        </Link>
                        <Link to="/forum" className="px-5 py-2 sm:px-6 sm:py-3 border border-white text-white 
                            rounded-lg font-medium hover:bg-white hover:text-green-600 transition text-center">
                            Visitar foro
                        </Link>
                    </div>
                </div>
            </section>

            {/* First advertisement banner */}
            <section className="mx-96 my-12 p-4 flex flex-col border-2 border-gray-300 rounded-lg">
                <h6 className="text-sm sm:text-sm font-light text-center text-black mb-6 md:mb-8">
                    ANUNCIO
                </h6>
                <img className="w-full h-full" src="https://www.librerias-picasso.com/images/logo.png" />
            </section>

            {/* Statistics section */}
            <section id="stats-section" className="statistics-section py-12 md:py-20 bg-green-50">
                <h2 className="text-2xl sm:text-3xl font-light text-center text-green-600 mb-6 md:mb-8">
                    Datos y estadísticas
                </h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {statistics.map((stats, index) => (
                    <motion.div className="text-center px-4 py-6 bg-white rounded-lg shadow-md" 
                        key={stats.key} 
                        initial="hidden" 
                        animate={controls} 
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} 
                        transition={{ delay: index * 0.2, duration: 0.6 }}>
                            <div className={`stats-bar ${stats.key}`}></div>
                        <div className="text-4xl sm:text-5xl font-extrabold text-green-600">{stats.label}</div>
                        <div className="mt-2 text-gray-700 text-sm sm:text-base">{stats.subtitle}</div>
                    </motion.div>
                ))}
                </div>
            </section>

            {/* Second advertisement banner */}
            <section className="mx-96 my-12 p-4 flex flex-col border-2 border-gray-300 rounded-lg">
                <h6 className="text-sm sm:text-sm font-light text-center text-black mb-6 md:mb-8">
                    ANUNCIO
                </h6>
                <img className="w-full h-full" src="https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2018/07/03/15306149779756.jpg" />
            </section>

            {/* TOC (OCD) patient test */}
            <section className="py-12 md:py-16 bg-amber-50">
                <div className="max-w-sm mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-light text-center text-green-600 mb-6 md:mb-8">
                        Test rápido
                    </h2>
                    <div className="mb-4">
                        <label className="block mb-3 text-center">
                            ¿Cuánto de tu tiempo está ocupado por pensamientos obsesivos?
                        </label>
                        <select className="bg-blue-500 border border-blue-900 text-white 
                            text-sm rounded-lg w-full p-2" 
                            value={selectedFirstQuestion || ""} 
                            onChange={(e) => setSelectedFirstQuestion(e.target.value)}>
                            <option value="">Selecciona...</option>
                            {optionsFirstQuestion.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                        </select>
                    </div>
                    {selectedFirstQuestion && (
                    <div className="mb-4">
                        <label className="block mb-3 text-center">
                            ¿Cuánto interfieren estos pensamientos obsesivos en tu vida cotidiana?
                        </label>
                        <select className="bg-blue-500 border border-blue-900 text-white 
                            text-sm rounded-lg w-full p-2" 
                            value={selectedSecondQuestion || ""} 
                            onChange={(e) => setSelectedSecondQuestion(e.target.value)}>
                            <option value="">Selecciona...</option>
                            {optionsSecondQuestion.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                        </select>
                    </div>
                    )}
                    {selectedSecondQuestion && (
                    <div className="mb-4">
                        <label className="block mb-3 text-center">
                            ¿Cuánto malestar te causan estos pensamientos obsesivos?
                        </label>
                        <select className="bg-blue-500 border border-blue-900 text-white 
                            text-sm rounded-lg w-full p-2" 
                            value={selectedThirdQuestion || ""} 
                            onChange={(e) => setSelectedThirdQuestion(e.target.value)}>
                            <option value="">Selecciona...</option>
                            {optionsThirdQuestion.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                        </select>
                    </div>
                    )}
                    {renderTestResult()}
                </div>
            </section>

            {/* Testimonials carousel */}
            <section className="py-12 md:py-16 bg-white">
                <h2 className="text-2xl sm:text-3xl font-light text-center text-green-600 mb-6 md:mb-8">
                    Testimonios Reales
                </h2>
                <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Render only the current testimonial to ensure visibility */}
                <motion.div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg" 
                    key={current} 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5 }}>
                    <div className="flex flex-col items-center text-center">
                        <img src={testimonials[current].img} 
                            alt={`Imagen de paciente ${testimonials[current].name}`} 
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-full mb-4" />
                        <div className="text-base sm:text-lg text-gray-800 mb-1 font-semibold">
                            {testimonials[current].provider}
                        </div>
                        <p className="mb-3 text-gray-600 text-sm sm:text-base">
                            "{testimonials[current].text}"
                        </p>
                        <div className="font-medium text-gray-500 text-xs sm:text-sm">
                            {testimonials[current].name} - {testimonials[current].role}
                        </div>
                    </div>
                </motion.div>
                <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-500 
                    text-white p-2 rounded-full hover:bg-green-600 transition hidden sm:block" 
                    onClick={prevTestimonial}>
                    <ChevronLeft />
                </button>
                <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-500 
                    text-white p-2 rounded-full hover:bg-green-600 transition hidden sm:block" 
                    onClick={nextTestimonial}>
                    <ChevronRight />
                </button>
                </div>
            </section>

            {/* Scroll to top and cookies banner */}
            {!cookiesAccepted && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg p-1 sm:p-4 flex flex-col sm:flex-row items-center sm:space-x-4 shadow-lg">
                    <p className="text-xs sm:text-xs text-gray-800 text-center sm:text-left mb-2 sm:mb-0">
                        Utilizamos cookies para prestar, mantener y mejorar nuestros servicios, además de por 
                        motivos de seguridad. Al hacer clic en "Aceptar", aceptas nuestra 
                        <Link to="/cookie_policies" className="text-xs underline text-green-500 
                            hover:text-green-700 ms-1">
                            política de cookies
                        </Link>.
                    </p>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg 
                        hover:bg-green-600 transition text-xs sm:text-sm font-medium" 
                        onClick={() => setCookiesAccepted(true)}>
                        Aceptar
                    </button>
                </div>
            )}

            <button className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 p-3 sm:p-4 
                rounded-full shadow-lg transition" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ChevronUp />
            </button>
        </div>
    );
};

export default Home;
