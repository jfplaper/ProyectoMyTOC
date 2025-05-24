import React from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";

const CookiePolicies = () => {
    return (
        <>
            <div className="flex items-center gap-2 mt-4 ml-4">
                <Link to="/" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                    <House className="w-6 h-6 text-[#2AB7FA] hover:text-blue-700" />
                </Link>
                /
                <Link to="/cookie_policies" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                    Política de cookies
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center mx-24 mb-12">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">AVISO LEGAL</h2>
                <div className="grid grid-cols-1 gap-6 p-4">
                    <h3 className="text-2xl">Condiciones generales</h3>
                    <p>
                        El dominio www.mytoc.com es de titularidad de I.E.S. Politécnico Hermenegildo Lanz, con sede 
                        en la Calle Albondón 12 de Granada.
                    </p>
                    <p>
                        La página web www.mytoc.com y todos los subdominios y directorios incluidos bajo la misma 
                        cumplen la función de información general sobre el Trastorno obsesivo-compulsivo (TOC) 
                        proporcionando herramientas y un listado de clínicas homologadas y acreditadas para su 
                        tratamiento.
                    </p>
                    <p>
                        MyTOC no se hace responsable de los daños y perjuicios que pudiera ocasionar la utilización 
                        de las herramientas e informaciones contenidas en su Web en relación con la adopción de 
                        decisiones sobre el inicio o no de tratamientos para afrontar el Trastorno 
                        obsesivo-compulsivo (TOC), ya sea de manera individual o a través de clínicas listadas y/o 
                        publicitadas en la Web.
                    </p>
                    <p>
                        MyTOC no garantiza la inexistencia de interrupciones o errores en el acceso a su Web ni en 
                        sus diferentes contenidos. Tampoco garantiza que éste se encuentre siempre y en todos los 
                        casos actualizado aunque hará todo lo posible para subsanar los errores técnicos y velará 
                        por la actualidad y exactitud de sus contenidos. En todo caso, MyTOC se reserva el derecho 
                        a realizar cambios en el Sitio Web sin previo aviso, con el objeto de actualizar, corregir, 
                        modificar, añadir o eliminar los contenidos del Sitio Web o de su diseño.
                    </p>
                    <p>
                        MyTOC no se responsabiliza de las contestaciones que se realicen a través de las distintas 
                        direcciones de correo electrónico que aparecen en estas páginas, salvo la del propio 
                        MyTOC. La información obtenida a través de los buzones contenidos en estas páginas tiene 
                        carácter orientativo y de información general, sin que en ningún caso pueda derivarse de 
                        ella efecto jurídico vinculante alguno en los términos previstos en el artículo 4 del Real 
                        Decreto 208/1996, de 9 de febrero.
                    </p>
                    <p>
                        MyTOC procederá a bloquear usuarios y mensajes en el foro que no respeten al resto de 
                        usuarios, que tengan una mala intención y/o incurran en algún delito llegando a tomar
                        acciones legales si fuera preciso.
                    </p>

                    <h3 className="text-2xl">Protección de Datos Personales</h3>
                    <p>
                        Los datos personales objeto de tratamiento por parte de MyTOC se obtienen y se tratan de 
                        acuerdo con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril 
                        de 2016 (Reglamento General de Protección de Datos - RGPD).
                        <a href="https://mpt.gob.es/ministerio/proteccion-datos/normativa.html" 
                            target="_blank" className="ms-1.5 underline">
                            Más información
                        </a>.
                    </p>

                    <h3 className="text-2xl">Política de cookies</h3>
                    <p>
                        MyTOC informa acerca del uso de las cookies en sus páginas web.
                    </p>
                    <p>
                        Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. 
                        Son herramientas que tienen un papel esencial para la prestación de numerosos servicios de 
                        la sociedad de la información. Entre otros, permiten a una página web almacenar y recuperar 
                        información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de 
                        la información obtenida, se pueden utilizar para reconocer al usuario y mejorar el servicio 
                        ofrecido.
                    </p>

                    <h3 className="text-2xl">Tipos de cookies</h3>
                    <p>
                        Según quien sea la entidad que gestione el dominio desde donde se envían las cookies y 
                        trate los datos que se obtengan se pueden distinguir dos tipos: cookies propias y cookies 
                        de terceros.
                    </p>
                    <p>
                        Existe también una segunda clasificación según el plazo de tiempo que permanecen almacenadas 
                        en el navegador del cliente, pudiendo tratarse de cookies de sesión o cookies persistentes.
                    </p>
                    <p>
                        Por último, existe otra clasificación con cinco tipos de cookies según la finalidad para la 
                        que se traten los datos obtenidos: cookies técnicas, cookies de personalización, cookies de 
                        análisis, cookies publicitarias y cookies de publicidad comportamental.
                    </p>

                    <h3 className="text-2xl">Finalidad de las Cookies utilizadas en la web</h3>
                    <p>
                        La página web de MyTOC utiliza cookies para almacenar la siguiente información:
                    </p>
                    <ul className="list-disc">
                        <li>
                            El formato de la web en el acceso desde dispositivos móviles.
                        </li>
                        <li>
                            El contenido del apartado "mytocApp web"
                        </li>
                        <li>
                            Información acerca de si se muestran o no los servicios.
                        </li>
                        <li>
                            Información acerca de si acepta o no la política de cookies para mostrar o no el aviso de la cabecera.
                        </li>
                        <li>
                            Información acerca de los RSS a los que está suscrito el usuario dentro de la web.
                        </li>
                        <li>
                            Información acerca de las noticias leídas dentro del servicio de RSS.
                        </li>
                    </ul>

                    <h3 className="text-2xl">Aceptación de la Política de cookies</h3>
                    <p>
                        MyTOC asume que usted acepta el uso de cookies. No obstante, muestra información sobre su 
                        Política de cookies en la parte inferior de la página Home del Sitio Web, también en cada 
                        inicio de sesión, con el objeto de que usted sea consciente.
                    </p>
                    <p>
                        Ante esta información es posible llevar a cabo las siguientes acciones:
                    </p>
                    <ul className="list-disc">
                        <li>
                            Aceptar cookies. No se volverá a visualizar este aviso al acceder a cualquier página del 
                            Sitio Web durante la presente sesión.
                        </li>
                        <li>
                            Modificar la configuración. Podrá obtener más información sobre qué son las cookies, 
                            conocer la Política de cookies de MyTOC y modificar la configuración de su navegador.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CookiePolicies;
