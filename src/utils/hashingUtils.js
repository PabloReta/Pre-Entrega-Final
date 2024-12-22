import bcrypt from 'bcrypt';

// Encripta una contraseña
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Valida si una contraseña ingresada coincide con la almacenada
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
