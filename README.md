# 📦 Pre Entrega Final - Backend

Este proyecto corresponde a la Pre Entrega Final del curso de Backend de **Coderhouse**.  
Incluye autenticación con GitHub, manejo de sesiones con cookies y JWT, persistencia de datos en MongoDB, generación de datos mockeados y una imagen Docker lista para desplegar la aplicación en cualquier entorno.

---

## 🚀 Requisitos

- Node.js v18 o superior (para desarrollo local)
- Docker y cuenta en Docker Hub (opcional para ejecución en contenedor)
- Archivo `.env` con las variables necesarias (ver sección correspondiente)

---

## 🔐 Variables de Entorno

Creá un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=8080

GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8080/api/users/githubcallback

SECRET_SESSION=clave_para_session
MONGO_URI=tu_uri_de_mongo
SECRET_JWT=clave_para_jwt
```

También podés usar el archivo `.env.example` como plantilla base:

```bash
cp .env.example .env
```

---

## 🧪 Instalación y Ejecución Local

```bash
git clone https://github.com/tuusuario/preentregafinal.git
cd preentregafinal
npm install
cp .env.example .env  # completar luego con tus variables reales
npm start
```

La aplicación estará disponible en: [http://localhost:8080](http://localhost:8080)

---

## 🐳 Ejecución con Docker

Este proyecto también puede ejecutarse usando Docker. La imagen está publicada en Docker Hub.

### 🔗 Enlace a Docker Hub

👉 [https://hub.docker.com/r/pabloreta/preentregafinal](https://hub.docker.com/r/pabloreta/preentregafinal)

### 📥 Descargar imagen

```bash
docker pull pabloreta/preentregafinal
```

### 🚀 Ejecutar contenedor

#### Opción 1: usando archivo `.env`

```bash
cp .env.example .env  # completar con valores reales
docker run -p 8080:8080 --env-file .env pabloreta/preentregafinal
```

#### Opción 2: pasando variables manualmente

```bash
docker run -p 8080:8080 \
-e MONGO_URI="tu_uri_de_mongo" \
-e SECRET_SESSION="tu_secreto_session" \
-e SECRET_JWT="tu_secreto_jwt" \
-e GITHUB_CLIENT_ID="tu_client_id" \
-e GITHUB_CLIENT_SECRET="tu_client_secret" \
-e GITHUB_CALLBACK_URL="http://localhost:8080/api/users/githubcallback" \
pabloreta/preentregafinal
```

---

## 📁 Estructura del Proyecto

```
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
```

---

## ✨ Funcionalidades

✅ Autenticación con GitHub  
✅ Inicio de sesión con JWT  
✅ Gestión de sesiones con cookies  
✅ Persistencia en MongoDB (local o en Atlas)  
✅ Mockeo de datos con Faker.js  
✅ Imagen Docker lista para despliegue

---

## 👤 Autor

- **Pablo Reta**  
- GitHub: [@pabloreta](https://github.com/pabloreta)

---
