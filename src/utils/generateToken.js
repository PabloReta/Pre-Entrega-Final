import jwt from 'jsonwebtoken';

// Genera un token JWT con un tiempo de expiración de 24 horas
export const generateToken = (user) => {
   return jwt.sign({ user }, process.env.SECRET_JWT, { expiresIn: '24h' });
};
