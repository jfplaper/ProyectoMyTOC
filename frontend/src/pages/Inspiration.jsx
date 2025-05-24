import React from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";

const Inspiration = () => {
    return (
        <>
            <div className="flex items-center gap-2 mt-4 ml-4">
                <Link to="/" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                    <House className="w-6 h-6 text-[#2AB7FA] hover:text-blue-700" />
                </Link>
                /
                <Link to="/inspiration" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                    Inspírate
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center mx-24 mb-12">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">QUEREMOS INSPIRARTE Y MOTIVARTE</h2>
                <div className="grid grid-cols-1 gap-6 p-4" style={{ backgroundImage: "url('/images/background_inspiration.jpg')" }}>
                    <h3 className="text-2xl">¿Por qué llevar un registro diario de tu TOC?</h3>
                    <p>
                        En MyTOC creemos que contabilizar el número de compulsiones, es decir, cada evento 
                        compulsivo que realizas, puede ayudarte en tu lucha contra el TOC. El motivo es que, 
                        ya sea de manera individual o mejor aún complementado con terapia psicológica, 
                        seguimiento y ayuda especializada en este trastorno, llevar un control de tu TOC diario 
                        te va a permitir tomar mayor conciencia del problema, de cómo está afectando a tu vida y 
                        a tu calidad de vida e incluso del tiempo perdido que inviertes en ello.
                    </p>
                    <p>
                        Ver el número de compulsiones (repetición de manías) que has realizado al cabo del día, 
                        mes o durante más tiempo junto a gráficos que generamos para ver con más detalle el 
                        trastorno y su evolución puede ayudarte a afrontarlo, motivarte y permitir hacer un 
                        seguimiento y mejor tratamiento de tu caso. De hecho esto no es nuevo; algunos 
                        psicólogos ya le piden a sus pacientes que lleven un registro diario en un papel con 
                        un gráfico facilitado por ellos mismos. La diferencia está en que, debido al uso 
                        actual y bastante frecuente de dispositivos móviles, en especial el teléfono móvil, 
                        nos parece que el paciente va a ser más riguroso llevando el registro (es sólo darle 
                        a un botón cada vez que se realiza una compulsión) que anotándolo en un papel.
                    </p>
                    <p>
                        ¡Por ello, para poder hacer uso de esta herramienta/servicio, te invitamos y animamos a 
                        registrarte como usuario/a y probarla! Desde 
                        <Link to="/mytocappmanual" className="text-[#2AB7FA] underline hover:text-blue-700 mx-1.5">
                            aquí
                        </Link>
                        puedes acceder a nuestro rápido y sencillo manual y/o explicación de su uso.
                    </p>

                    <h3 className="text-2xl text-[#2ABF7A] text-center mt-6 mb-0">Carta de una paciente real</h3>
                    <h4 className="text-xl text-gray-700 text-center mt-0">
                        Extraída del libro <i>"Sin Miedo"</i>, de <strong>Rafael Santandreu</strong>
                    </h4>
                    <div className="bg-green-100 py-8 px-4 text-center rounded-lg opacity-70">
                        <p className="py-2">
                        &laquo;Escribo este texto desde el corazón. Por un lado, orgullosa de haber superado el 
                        TOC y los obstáculos que ha puesto en mi camino. Por otro lado, con humildad, puesto que 
                        no soy médico ni psicóloga.
                        </p>
                        <p className="py-2">
                            Está basado en mi experiencia personal y en lo que he aprendido durante este proceso. 
                            Como paciente de TOC tendrás...
                        </p>
                        <p className="py-2">
                            (...)
                        </p>
                        <p className="py-2">
                            Sigue, trabaja cada día, esfuérzate y prioriza tu recuperación frente a todo lo 
                            demás. El esfuerzo constante dará sus frutos, porque, recuerda, tu recuperación está 
                            a la vuelta de la esquina&raquo;.
                        </p>
                    </div>

                    <h3 className="text-2xl text-[#2ABF7A] text-center mt-6 mb-0">Frases y citas célebres</h3>
                    <h4 className="text-xl text-gray-700 text-center mt-0 mb-6">
                        ¡Siempre vienen bien frases y citas inspiradoras!
                    </h4>
                    
                    <p className="text-xl font-semibold text-[#2ABF7A]">Jesús de Nazaret</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;Todo es posible para el que tiene fe&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Nelson Mandela</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;... valiente no es quien no siente miedo, sino aquel que conquista ese miedo&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Séneca</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;No es que no nos atrevemos porque las cosas son difíciles. Simplemente las hacemos 
                            difíciles cuando no nos atrevemos&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Thomas Alva Edison</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;No pierdo el ánimo, porque cada intento fallido que dejo atrás es un nuevo paso 
                        adelante&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Publio Virgilio Marón</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;El amor todo lo vence&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Albert Einstein</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;No pretendamos que las cosas cambien, si siempre hacemos lo mismo. La crisis es la 
                            mejor bendición que puede sucederle a personas y países, porque la crisis trae 
                            progresos&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Alejandro Jodorowsky</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;La llave de toda puerta es la humildad&raquo;.
                    </blockquote>
                    <p className="text-xl font-semibold text-[#2ABF7A]">Arthur Schopenhauer</p>
                    <blockquote cite="" className="ml-12">
                        &laquo;El destino baraja las cartas, nosotros las jugamos&raquo;.
                    </blockquote>
                </div>
            </div>
        </>
    );
};

export default Inspiration;
