--
-- Concede permisos al usuario JFPP si no los tiene aún
--
CREATE USER IF NOT EXISTS 'JFPP'@'%' IDENTIFIED BY '883767';
GRANT ALL PRIVILEGES ON mytoc.* TO 'JFPP'@'%';
FLUSH PRIVILEGES;

--
-- Base de datos: `mytoc`
--
CREATE DATABASE IF NOT EXISTS `mytoc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mytoc`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clinic`
--

CREATE TABLE `clinic` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clinic`
--

INSERT INTO `clinic` (`id`, `name`, `location`, `email`, `phone`, `url`, `description`, `image`) VALUES
(1, 'ITEGRA Psicología', 'C/ Méndez Núñez, 7, Local 23, 18003 - Granada', NULL, '628595531', 'https://www.itegrapsicologia.com/psicologo-especialista-en-toc/', 'Especializados en el tratamiento del TOC, ofrecen terapias personalizadas basadas en un análisis funcional del problema', 'itegra-67d8976829672.jpg'),
(2, 'Asociación TOC Granada', 'C/ El Tejo, nº 14. 18193 Monachil, Granada', 'atgcoordinacion@gmail.com', '616020637', 'https://centrodealojamientoysanitariodelaasociaciontocgranada.com/', 'Ofrecen apoyo 24 horas y un enfoque integral en el tratamiento del TOC, incluyendo alojamiento y terapias especializadas', 'asociacion-toc-granada-67d89796dc8b5.jpg'),
(3, 'NB Psicología', 'Online y provincia de Madrid', 'info@nbpsicologia.es', '910 800 502', 'https://nbpsicologia.es/terapia-a-distancia-online/', 'Ofrecen servicios de psicología con enfoque personalizado, atendiendo a pacientes de todas las provincias de España', 'nb-psicologia-67d897b5201a0.jpg'),
(4, 'Instituto de Psicología y Psicopedagogía de Málaga', 'Provincia de Málaga', 'info@psicologos-malaga.com', '952404040', 'https://www.psicologos-malaga.com/', 'Ofrecen tratamiento especializado en TOC y otros trastornos psicológicos, utilizando técnicas basadas en evidencia', 'instituto-psicologia-malaga-67d897c69f7ab.jpg'),
(5, 'Centro de Psicología Clínica y de la Salud de Málaga', 'Provincia de Málaga', NULL, NULL, NULL, 'Especializados en el diagnóstico y tratamiento del TOC, ofrecen terapias adaptadas a las necesidades de cada paciente', 'centro-psicologia-malaga-67d897e0d127f.jpg'),
(6, 'Centro de Psicología Álava Reyes', 'Online y provincia de Madrid', 'info@alavareyes.com', '917667028', 'https://www.alavareyes.com/', 'Ofrecen tratamiento especializado en TOC y otros trastornos, con un enfoque integral y personalizado según el paciente', 'alava-reyes-67d897ef38e72.jpg'),
(7, 'Ana Sánchez Psicóloga', 'C/ Espinosa 8, despacho 103, Valencia 46008', 'anasanpl@cop.es', '669941346', 'https://www.aspsicologa.com/trastorno-obsesivo-compulsivo-valencia/', 'Psicóloga especialista en Psicología Clínica dedicada, dentro del área de los trastornos y problemas de Ansiedad, al Tratamiento del Trastorno Obsesivo Compulsivo o TOC', 'ana-sanchez-psicologa-valencia-67d897fbdeffd.jpg'),
(8, 'Consulta de Psicología Más que TOC', 'C/ Fernández de Ribera, 32, 2° G, Sevilla', 'info@masquetoc.com', '624612734', 'https://masquetoc.com/consulta-psicologica-especializa-en-toc/', 'Consulta psicológica especializada en TOC así como en problemas relacionados con la Ansiedad y las Fobias', 'mas-que-toc-67d8980e797f5.jpg'),
(9, 'Iratxe López Psicología', 'Buenos Aires Kalea, 3, 48001 Bilbao, Bizkaia', 'info@iratxelopezpsicologia.com', '685772240', 'https://iratxelopezpsicologia.com/psicologos-trastorno-obsesivo-compulsivo/', 'Psicólogos para tratar trastorno obsesivo compulsivo, también conocido por su abreviatura (TOC), en Bilbao, Vizcaya, en el País Vasco', 'iratxe-lopez-psicologa-67d89820ddcb0.jpg'),
(10, 'Psicología Clínica | Nadia Pelaez Psicóloga Santiago', 'Rúa Frei Rosendo Salvado 15, Santiago de Compostela', 'info@nadiapelaez.es', '981591442', 'https://nadiapelaez.es/tratamientos-psicologia-santiago/psicologia-clinica-santiago/', 'Evaluación, comprensión y tratamiento de los problemas psicológicos de la persona así como de su prevención y salud mental con técnicas psicológicas y psicoterapéuticas', 'Psicologia-Clinica-Santiago-de-Compostela-Nadia-Pelaez-67d89848813b3.jpg'),
(11, 'IPITIA: Centro especializado en TOC y ansiedad', 'Carrer de Guitard, 45, 3º, 08014 Barcelona', 'info@ipitia.com', '935282353', 'https://ipitia.com/contacto-ipitia/', 'En el Ipitia queremos ayudarte a solucionar aquellos problemas, relacionados con el TOC y la Ansiedad, que te impiden ser quien realmente eres', 'ipitia-barcelona-67d8985a14e45.png'),
(12, 'Zoraida Rodríguez Centro de Psicología', 'C/ San Antón, nº 48-50, Entreplanta, Oficina 3, Granada', NULL, '676106782', 'https://zrpsicologos.es/', 'Gracias a los años de experiencia profesional como psicóloga en Granada, he convertido mi consulta en un equipo de profesionales, formado por especialistas altamente cualificados en diferentes áreas', 'zoraida-psicologa-67d898682a991.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `thread_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `visible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comment`
--

INSERT INTO `comment` (`id`, `author_id`, `thread_id`, `text`, `date`, `visible`) VALUES
(1, 4, 1, 'Yo también siento que el orden es muy importante, pero a veces siento que me consume demasiado tiempo', '2025-03-05 10:15:00', 1),
(2, 7, 1, 'Te entiendo completamente. Es como si nunca fuera suficiente, siempre quieres que todo esté perfectamente organizado', '2025-03-05 10:17:00', 1),
(3, 8, 1, 'Es difícil encontrar un equilibrio, a veces uno no se da cuenta de cuánto afecta esto a nuestra rutina diaria', '2025-03-06 12:30:00', 1),
(4, 6, 2, 'Es un síntoma común en el TOC, te recomiendo hablar con un profesional. A veces, la terapia cognitivo-conductual ayuda mucho', '2025-03-09 18:25:00', 1),
(5, 5, 2, 'Lo he experimentado también. Es difícil dejarlo, pero dar pequeños pasos y no rendirse es clave. ¡Ánimo!', '2025-03-10 14:55:12', 1),
(6, 5, 3, '¡Te entiendo! A veces la ansiedad hace que las dudas crezcan, pero sé que con paciencia y apoyo se puede reducir este comportamiento', '2025-03-12 12:35:00', 1),
(7, 6, 3, 'Te sugiero que establezcas un límite de comprobaciones, poco a poco verás que no es necesario hacerlo tantas veces', '2025-03-12 12:37:00', 1),
(8, 4, 3, 'Lo mismo me pasó hace poco. Es importante saber que no necesitas comprobar tantas veces. Hablarlo con un terapeuta te ayudará mucho', '2025-03-15 23:40:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compulsion`
--

CREATE TABLE `compulsion` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `toc_id` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compulsion`
--

INSERT INTO `compulsion` (`id`, `user_id`, `toc_id`, `date`) VALUES
(1, 1, 2, '2025-03-22 21:47:00'),
(2, 1, 2, '2025-03-22 21:48:00'),
(3, 1, 2, '2025-03-22 21:49:00'),
(4, 1, 3, '2025-03-24 13:57:09'),
(5, 1, 5, '2025-03-24 13:59:09'),
(6, 1, 1, '2025-04-24 13:51:27'),
(7, 1, 1, '2025-04-24 13:52:08'),
(8, 1, 4, '2025-04-24 14:04:10'),
(9, 1, 3, '2025-05-07 17:37:02'),
(10, 1, 3, '2025-05-21 18:49:16'),
(11, 9, 1, '2025-05-01 12:30:00'),
(12, 9, 1, '2025-05-01 13:30:00'),
(13, 9, 1, '2025-05-01 14:30:00'),
(14, 9, 1, '2025-05-01 15:30:00'),
(15, 9, 1, '2025-05-01 16:30:00'),
(16, 9, 1, '2025-05-02 12:30:00'),
(17, 9, 1, '2025-05-02 13:30:00'),
(18, 9, 1, '2025-05-02 14:30:00'),
(19, 9, 1, '2025-05-02 15:30:00'),
(20, 9, 1, '2025-05-02 16:30:00'),
(21, 9, 1, '2025-05-03 12:30:00'),
(22, 9, 1, '2025-05-03 13:30:00'),
(23, 9, 1, '2025-05-03 14:30:00'),
(24, 9, 1, '2025-05-03 15:30:00'),
(25, 9, 1, '2025-05-03 16:30:00'),
(26, 9, 1, '2025-05-04 12:30:00'),
(27, 9, 1, '2025-05-04 13:30:00'),
(28, 9, 1, '2025-05-04 14:30:00'),
(29, 9, 1, '2025-05-04 15:30:00'),
(30, 9, 1, '2025-05-04 16:30:00'),
(31, 9, 1, '2025-05-05 12:30:00'),
(32, 9, 1, '2025-05-05 13:30:00'),
(33, 9, 1, '2025-05-05 14:30:00'),
(34, 9, 1, '2025-05-05 15:30:00'),
(35, 9, 1, '2025-05-05 16:30:00'),
(36, 9, 1, '2025-05-06 12:30:00'),
(37, 9, 1, '2025-05-06 13:30:00'),
(38, 9, 1, '2025-05-06 14:30:00'),
(39, 9, 1, '2025-05-06 15:30:00'),
(40, 9, 1, '2025-05-06 16:30:00'),
(41, 9, 1, '2025-05-07 12:30:00'),
(42, 9, 1, '2025-05-07 13:30:00'),
(43, 9, 1, '2025-05-07 14:30:00'),
(44, 9, 1, '2025-05-07 15:30:00'),
(45, 9, 1, '2025-05-08 16:30:00'),
(46, 9, 1, '2025-05-08 12:30:00'),
(47, 9, 1, '2025-05-08 13:30:00'),
(48, 9, 1, '2025-05-08 14:30:00'),
(49, 9, 1, '2025-05-08 15:30:00'),
(50, 9, 1, '2025-05-09 12:30:00'),
(51, 9, 1, '2025-05-09 13:30:00'),
(52, 9, 1, '2025-05-09 14:30:00'),
(53, 9, 1, '2025-05-09 15:30:00'),
(54, 9, 1, '2025-05-10 16:30:00'),
(55, 9, 1, '2025-05-10 12:30:00'),
(56, 9, 1, '2025-05-10 13:30:00'),
(57, 9, 1, '2025-05-10 14:30:00'),
(58, 9, 1, '2025-05-10 15:30:00'),
(59, 9, 1, '2025-05-11 12:30:00'),
(60, 9, 1, '2025-05-11 13:30:00'),
(61, 9, 1, '2025-05-11 14:30:00'),
(62, 9, 1, '2025-05-11 15:30:00'),
(63, 9, 1, '2025-05-12 16:30:00'),
(64, 9, 1, '2025-05-12 12:30:00'),
(65, 9, 1, '2025-05-12 13:30:00'),
(66, 9, 1, '2025-05-12 14:30:00'),
(67, 9, 1, '2025-05-12 15:30:00'),
(68, 9, 1, '2025-05-13 12:30:00'),
(69, 9, 1, '2025-05-13 13:30:00'),
(70, 9, 1, '2025-05-13 14:30:00'),
(71, 9, 1, '2025-05-14 15:30:00'),
(72, 9, 1, '2025-05-14 16:30:00'),
(73, 9, 1, '2025-05-14 12:30:00'),
(74, 9, 1, '2025-05-14 13:30:00'),
(75, 9, 1, '2025-05-15 12:30:00'),
(76, 9, 1, '2025-05-15 13:30:00'),
(77, 9, 1, '2025-05-15 14:30:00'),
(78, 9, 1, '2025-05-16 15:30:00'),
(79, 9, 1, '2025-05-16 16:30:00'),
(80, 9, 1, '2025-05-16 12:30:00'),
(81, 9, 1, '2025-05-16 13:30:00'),
(82, 9, 1, '2025-05-17 12:30:00'),
(83, 9, 1, '2025-05-17 13:30:00'),
(84, 9, 1, '2025-05-17 14:30:00'),
(85, 9, 1, '2025-05-18 15:30:00'),
(86, 9, 1, '2025-05-18 16:30:00'),
(87, 9, 1, '2025-05-18 12:30:00'),
(88, 9, 1, '2025-05-18 13:30:00'),
(89, 9, 1, '2025-05-19 12:30:00'),
(90, 9, 1, '2025-05-19 13:30:00'),
(91, 9, 1, '2025-05-19 14:30:00'),
(92, 9, 1, '2025-05-19 15:30:00'),
(93, 9, 1, '2025-05-19 16:30:00'),
(94, 9, 1, '2025-05-20 12:30:00'),
(95, 9, 1, '2025-05-20 13:30:00'),
(96, 9, 1, '2025-05-20 14:30:00'),
(97, 9, 1, '2025-05-20 15:30:00'),
(98, 9, 1, '2025-05-21 12:30:00'),
(99, 9, 1, '2025-05-21 13:30:00'),
(100, 9, 1, '2025-05-21 14:30:00'),
(101, 9, 1, '2025-05-21 15:30:00'),
(102, 9, 1, '2025-05-22 16:30:00'),
(103, 9, 1, '2025-05-22 12:30:00'),
(104, 9, 1, '2025-05-22 13:30:00'),
(105, 9, 1, '2025-05-22 14:30:00'),
(106, 9, 1, '2025-05-23 12:30:00'),
(107, 9, 1, '2025-05-23 13:30:00'),
(108, 9, 1, '2025-05-23 14:30:00'),
(109, 9, 1, '2025-05-24 15:30:00'),
(110, 9, 1, '2025-05-24 16:30:00'),
(111, 9, 1, '2025-05-24 12:30:00'),
(112, 9, 1, '2025-05-25 12:30:00'),
(113, 9, 1, '2025-05-25 13:30:00'),
(114, 9, 1, '2025-05-25 14:30:00'),
(115, 9, 1, '2025-05-25 15:30:00'),
(116, 9, 1, '2025-05-26 16:30:00'),
(117, 9, 1, '2025-05-26 12:30:00'),
(118, 9, 1, '2025-05-27 12:30:00'),
(119, 9, 1, '2025-05-27 13:30:00'),
(120, 9, 1, '2025-05-27 14:30:00'),
(121, 9, 1, '2025-05-28 15:30:00'),
(122, 9, 1, '2025-05-28 16:30:00'),
(123, 9, 1, '2025-05-29 12:30:00'),
(124, 9, 1, '2025-05-30 13:30:00'),
(125, 9, 1, '2025-05-30 14:30:00'),
(126, 9, 1, '2025-05-31 12:30:00'),
(127, 9, 2,'2025-05-15 12:30:00'),
(128, 9, 3,'2025-05-05 12:30:00'),
(129, 9, 4,'2025-05-25 12:30:00'),
(130, 9, 5,'2025-05-15 12:30:00'),
(131, 9, 6,'2025-05-05 12:30:00'),
(132, 9, 7,'2025-05-25 12:30:00'),
(133, 9, 8,'2025-05-15 12:30:00'),
(134, 9, 9,'2025-05-05 12:30:00'),
(135, 9, 10,'2025-05-25 12:30:00'),
(136, 9, 11,'2025-05-18 12:30:00'),
(137, 9, 12,'2025-05-12 12:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20250315234403', '2025-03-16 00:44:16', 85),
('DoctrineMigrations\\Version20250316190301', '2025-03-16 20:03:09', 59),
('DoctrineMigrations\\Version20250316201529', '2025-03-16 21:15:35', 12),
('DoctrineMigrations\\Version20250316214439', '2025-03-16 22:44:47', 72),
('DoctrineMigrations\\Version20250317172454', '2025-03-17 18:25:10', 112),
('DoctrineMigrations\\Version20250317180015', '2025-03-17 19:00:23', 109),
('DoctrineMigrations\\Version20250317205011', '2025-03-17 21:50:19', 49),
('DoctrineMigrations\\Version20250317215932', '2025-03-17 22:59:41', 128),
('DoctrineMigrations\\Version20250321124812', '2025-03-21 13:48:28', 124);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `event`
--

INSERT INTO `event` (`id`, `creator_id`, `title`, `text`, `date`, `location`, `price`, `image`) VALUES
(1, 1, 'Conferencia \"Aborda el TOC\"', 'Os invitamos a una conferencia de puertas abiertas donde uno de los más expertos y prestigiosos psicólogos nos concederá una master class explicándonos qué herramientas y recursos emplear para afrontar el trastorno obsesivo-compulsivo. ¡Animaos a venir!', '2025-05-21 18:00:00', 'Facultad de Psicología, Granada', NULL, 'evento-conferencia-67ddb0cb97cc4.jpg'),
(2, 2, 'Festival de música 2025', 'Este verano ven a escuchar a tus cantantes favoritos en uno de los festivales de música indie más populares de Granada. La venta de entradas es online', '2025-06-14 22:30:00', 'Palacio de deportes, Granada', 25, 'evento-festival-67ddb0ec44e2c.jpg'),
(3, 3, 'Viaje y comida de despedida', 'Hemos organizado un viaje a Málaga y una comida para despedirnos hasta la vuelta en verano, y para celebrar los avances y logros conseguidos a lo largo de esta temporada. ¡Os esperamos!', '2025-06-28 14:30:00', 'Bodega Bar El Pimpi, Málaga', 18, 'evento-comida-67ddb2ca83978.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thread`
--

CREATE TABLE `thread` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `visible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `thread`
--

INSERT INTO `thread` (`id`, `author_id`, `title`, `date`, `visible`) VALUES
(1, 5, 'Estoy obsesionada con el orden de mi armario', '2025-03-04 22:39:33', 1),
(2, 7, 'Me lavos las manos constantemente. No sé qué hacer...', '2025-03-09 18:20:31', 1),
(3, 8, 'Tengo que comprobar tres veces la puerta de mi casa antes de acostarme. ¡Ayuda!', '2025-03-12 11:45:59', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `toc`
--

CREATE TABLE `toc` (
  `id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `customed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `toc`
--

INSERT INTO `toc` (`id`, `creator_id`, `name`, `description`, `image`, `customed`) VALUES
(1, 1, 'Limpieza', 'Miedo a la suciedad o gérmenes que lleva a lavarse en exceso', 'limpieza-67d846046a96c.jpg', 0),
(2, 2, 'Verificación', 'Necesidad constante de revisar cosas, como cerraduras', 'verificacion-67d846eb0d445.jpg', 0),
(3, 3, 'Ordenación', 'Necesidad de que todo esté en orden', 'ordenacion-67d84760389ff.jpg', 0),
(4, 1, 'Pensamiento intrusivo', 'Ideas o imágenes no deseadas, angustiosas', 'pensamiento-intrusivo-67d8478886551.jpg', 0),
(5, 2, 'Acumulación', 'Dificultad para deshacerse de objetos, acumulación excesiva', 'acumulacion-67d847f9d5e81.jpg', 0),
(6, 3, 'Religioso', 'Realización de rituales u oraciones repetitivas', 'religioso-67d84823e8e71.jpg', 0),
(7, 1, 'Alineación', 'Necesidad de que los objetos estén en una posición exacta o equidistantes', 'alineacion-67d84840a9c88.jpg', 0),
(8, 2, 'Numeral', 'Necesidad de realizar acciones en un número específico', 'numeral-67d8485ac9b19.jpg', 0),
(9, 3, 'Hipocondríaco', 'Pensamientos temerosos sobre padecer enfermedades y muerte', 'hipocondriaco-67d848758beb6.jpg', 0),
(10, 1, 'Sexual', 'Pensamientos, sentimientos o dudas relacionados con la propia sexualidad', 'sexual-67d848954697c.jpg', 0),
(11, 2, 'Repetidor', 'Necesidad de tener que repetir una determinada acción', 'repetidor-67d848b2abb86.jpg', 0),
(12, 3, 'Perfeccionismo', 'Necesidad de hacer las cosas de una manera perfecta', 'perfeccionismo-67d848cb915ff.jpg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `banned` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `email`, `image`, `banned`) VALUES
(1, 'jorge', '[\"ROLE_USER\",\"ROLE_ADMIN\"]', '$2y$13$ooUDDgXNfvv8hqhl20nROut5O8Jl0h4QRzUmGPjoVi/GpSz5TQuD.', 'jfplaper@gmail.com', 'foto-perfil-jorge.png', 0),
(2, 'nacho', '[\"ROLE_USER\",\"ROLE_ADMIN\"]', '$2y$13$6yyiBE3xgzy2OmTr9BafBumPoUDsGAqqfz0xxpdjexjDnkTnSOoZC', 'nacho@gmail.com', 'batman-67d61b0f7dc96.png', 0),
(3, 'laura', '[\"ROLE_USER\",\"ROLE_ADMIN\"]', '$2y$13$w/CXGRmEzdjQ4CDXe.5xBuGSx8tuGrl5y32jkffxg2s2Hm6MPOesK', 'laura@gmail.com', 'spider-gwen-67d61b44ac396.png', 0),
(4, 'dario', '[\"ROLE_USER\"]', '$2y$13$xeRpHpO6yrl.mvtmtZO4quVK5Ci9yts7Nf1NXwEb5l6YqbfgsGf/6', 'dario@gmail.com', 'dario-67d84fce1cb5b.png', 0),
(5, 'esmeralda', '[\"ROLE_USER\"]', '$2y$13$d97UHJ6u3w5bAKFNq9Prv.LcD1g7pf3raQBaoP2yS/zfkijtVavJe', 'esmeralda@gmail.com', 'esmeralda-67d84ffe26e10.png', 0),
(6, 'juan', '[\"ROLE_USER\"]', '$2y$13$pge.3pMMFAg6UdRS6Kj9kuRhayTW7IaBoxwErbu9Y4WvkQT8FE6Vy', 'juan@gmail.com', 'juan-67d8506229f16.png', 0),
(7, 'lola', '[\"ROLE_USER\"]', '$2y$13$GbFOFGdRaCfkvYf2hR1To.0xgwjEHeVQ0oqaq4GA1Ojjh/sJNJKBK', 'lola@gmail.com', 'lola-67d850c1ee749.png', 0),
(8, 'hugo', '[\"ROLE_USER\"]', '$2y$13$Z/lvfmzy4XTqCJyLDfg2Ge4cL.8WnViO04xmdncwpSZjD26a2iLje', 'hugo@gmail.com', 'hugo-67d8511453043.png', 0),
(9, 'usertest', '[\"ROLE_USER\"]', '$2y$13$unrFg0egdE9uLB/RQUdEkeezOOF0Xn4QaY8MINC9RdB95chYoUIUG', 'usertest@gmail.com', 'usertest-6830d6cca700c.png', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clinic`
--
ALTER TABLE `clinic`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9474526CF675F31B` (`author_id`),
  ADD KEY `IDX_9474526CE2904019` (`thread_id`);

--
-- Indices de la tabla `compulsion`
--
ALTER TABLE `compulsion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_8CC83EE5A76ED395` (`user_id`),
  ADD KEY `IDX_8CC83EE58A804A27` (`toc_id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_3BAE0AA761220EA6` (`creator_id`);

--
-- Indices de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Indices de la tabla `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_31204C83F675F31B` (`author_id`);

--
-- Indices de la tabla `toc`
--
ALTER TABLE `toc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9A675E1461220EA6` (`creator_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_USERNAME` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clinic`
--
ALTER TABLE `clinic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `compulsion`
--
ALTER TABLE `compulsion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT de la tabla `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `thread`
--
ALTER TABLE `thread`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `toc`
--
ALTER TABLE `toc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_9474526CE2904019` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`id`),
  ADD CONSTRAINT `FK_9474526CF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `compulsion`
--
ALTER TABLE `compulsion`
  ADD CONSTRAINT `FK_8CC83EE58A804A27` FOREIGN KEY (`toc_id`) REFERENCES `toc` (`id`),
  ADD CONSTRAINT `FK_8CC83EE5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `FK_3BAE0AA761220EA6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `thread`
--
ALTER TABLE `thread`
  ADD CONSTRAINT `FK_31204C83F675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `toc`
--
ALTER TABLE `toc`
  ADD CONSTRAINT `FK_9A675E1461220EA6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);