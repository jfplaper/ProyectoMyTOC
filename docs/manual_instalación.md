# MyTOC - Manual de instalación

Instrucciones paso a paso para instalar y ejecutar el proyecto

## Requisitos previos
* Sistema operativo (Windows, Linux…)
* Terminal o consola de comandos (PowerShell, Git Bash…)
* PHP 8.2.0
* Symfony 7.2
* React 19.0.0
* MySQL 8.0.31
* Git

## Clonación del repositorio
* Como HTTPS: git clone https://github.com/jfplaper/ProyectoMyTOC.git
* Como SSH: git clone git@github.com:jfplaper/ProyectoMyTOC.git

## Instalación de dependencias
* Composer (luego a través de sus comandos require maker-bundle, orm, twig, security, form validator y phpunit)
* Symfony CLI
* "@tailwindcss/vite": "^4.0.15"
* "file-saver": "^2.0.5"
* "framer-motion": "^12.12.1"
* "html-to-image": "^1.11.13"
* "lucide-react": "^0.511.0"
* "react": "^19.0.0"
* "react-dom": "^19.0.0"
* "react-router-dom": "^7.4.0"
* "react-spinners": "^0.15.0"
* "recharts": "^2.15.3"
* "sonner": "^2.0.1"
* "tailwindcss": "^4.0.15"
* Dependencias de desarrollo:
* "@eslint/js": "^9.21.0"
* "@testing-library/jest-dom": "^6.6.3"
* "@testing-library/react": "^16.3.0"
* "@types/react": "^19.0.10"
* "@types/react-dom": "^19.0.4"
* "@vitejs/plugin-react-swc": "^3.8.0"
* "eslint": "^9.21.0"
* "eslint-plugin-react-hooks": "^5.1.0"
* "eslint-plugin-react-refresh": "^0.4.19"
* "globals": "^15.15.0"
* "jest": "^29.7.0"
* "jsdom": "^26.1.0"
* "vite": "^6.2.0"
* "vitest": "^3.1.2"

## Configuración de variables de entorno
* .env ubicado en la carpeta del proyecto raíz:
    * MYSQL_ROOT_PASSWORD=root
    * MYSQL_DATABASE=mytoc
    * MYSQL_USER=JFPP
    * MYSQL_PASSWORD=883767
    * PMA_USER=${MYSQL_USER}
    * PMA_PASSWORD=${MYSQL_PASSWORD}
* Dentro del .env ubicado en la carpeta backend:
    * DATABASE_URL="mysql://root@127.0.0.1:3306/mytoc"
* .env ubicado en la carpeta frontend:
    * CHOKIDAR_USEPOLLING=true
    * VITE_BASE_URL=http://127.0.0.1:8000

## Migración o carga de la base de datos
* php bin/console doctrine:database:create
* php bin/console doctrine:migrations:diff
* Después, si se hicieran cambios:
* php bin/console make:migration
* php bin/console doctrine:migrations:migrate
## Comandos de inicio
* Como HTTPS: git clone https://github.com/jfplaper/ProyectoMyTOC.git
* Como SSH: git clone git@github.com:jfplaper/ProyectoMyTOC.git
* cd ProyectoMyTOC-main
* cd backend
* composer install
* Editar el .env de la carpeta backend
* Modificar y editar en lo que se desee el .env de la carpeta raíz del proyecto
* php bin/console doctrine:database:create
* php bin/console doctrine:migrations:migrate
* symfony server:start o symfony server:start -d
* cd frontend
* npm install
* Configurar variables del .env de la carpeta frontend
* npm start o npm run dev
