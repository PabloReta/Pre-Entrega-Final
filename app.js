import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import expressSession from 'express-session';


// Configuración de dotenv
dotenv.config();

// Importación de archivos locales
import initializePassport from './src/config/passport.config.js';
import ticketRoutes from './src/routes/tickets.routes.js';
import productRoutes from './src/routes/products.routes.js';
import cartRoutes from './src/routes/carts.routes.js';
import userRoutes from './src/routes/users.routes.js';
import mocksRouter from './src/routes/mocks.router.js'
import { specs, swaggerUiExpress } from './src/config/swagger.js';

// Inicialización de la aplicación
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({ 
    secret: process.env.SECRET_SESSION || 'defaultSecret', 
    resave: true, 
    saveUninitialized: true 
}));

// Inicialización de Passport
initializePassport();
app.use(passport.initialize());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'PreEntregaFinal',    
  })
    .then(() => console.log('🟢 Conectado a MongoDB en base PreEntregaFinal'))
    .catch(err => console.error('🔴 Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/tickets', ticketRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mocks', mocksRouter)
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send({ error: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Error interno del servidor' });
});

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


export default app


