import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import initializePassport from './src/config/passport.config.js';
import userRoutes from './src/routes/users.routes.js';

//Intentos de corregir el login de gihub*****
import expressSession from 'express-session';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

//Intentos de corregir error con el login de gihhub*****
app.use(expressSession({ secret: process.env.SECRET_SESSION, resave: true, saveUninitialized: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/users', userRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
