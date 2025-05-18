Pre Entrega Final - Backend

Este proyecto forma parte de la Pre Entrega Final del curso de Backend de Coderhouse. Incluye autenticación con GitHub, manejo de sesiones y tokens JWT, persistencia en MongoDB, mockeo de datos, y una imagen Docker lista para desplegar.

🚀 Requisitos

Node.js >= 18 (para desarrollo local)

Docker y Docker Hub (opcional para desplegar la app)

Archivo .env con las variables necesarias (ver sección de variables de entorno)

🔧 Variables de Entorno

Creá un archivo .env en la raíz del proyecto (no se sube al repo, está en .gitignore) con este contenido:

PORT=8080

GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8080/api/users/githubcallback

SECRET_SESSION=clave_para_session
MONGO_URI=tu_uri_de_mongo
SECRET_JWT=clave_para_jwt

También podés usar el archivo .env.example como plantilla base.

🧪 Instalación y ejecución local

git clone https://github.com/tuusuario/preentregafinal.git
cd preentregafinal
npm install
cp .env.example .env  # luego completar con tus valores
npm start

La app correrá en: http://localhost:8080

🐳 Uso con Docker

1. Descargar la imagen desde Docker Hub

docker pull pabloreta/preentregafinal

2. Crear el archivo .env (puede basarse en .env.example)

cp .env.example .env  # y completar los valores reales

3. Ejecutar el contenedor

docker run -p 8080:8080 --env-file .env pabloreta/preentregafinal

La aplicación estará disponible en: http://localhost:8080

📁 Estructura del Proyecto

📦 preentregafinal/
 ┣ 📁 src/
 ┃ ┣ 📂 config/
 ┃ ┣ 📂 controllers/
 ┃ ┣ 📂 dao/
 ┃ ┣ 📂 middlewares/
 ┃ ┣ 📂 models/
 ┃ ┣ 📂 routes/
 ┃ ┣ 📂 services/
 ┃ ┣ 📂 utils/
 ┃ ┗ 📂 views/
 ┣ 📄 Dockerfile
 ┣ 📄 package.json
 ┣ 📄 .env.example
 ┣ 📄 README.md

✨ Funcionalidades

Autenticación con GitHub

Inicio de sesión con JWT

Gestión de sesiones con cookies

Persistencia con MongoDB (local o Atlas)

Mockeo de datos con Faker.js

Imagen Docker lista para producción/despliegue

👤 Autor

Pablo RetaGitHub

