import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id,  email: user.email, role: user.role }, 
    process.env.SECRET_JWT,
    { expiresIn: '1h' }
  );
};
