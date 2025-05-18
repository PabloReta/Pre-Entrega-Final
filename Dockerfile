# Usa una imagen oficial de Node como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa tu app
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["npm", "start"]
