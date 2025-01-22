import bcrypt from 'bcrypt';
import User from '../dao/models/User.js'; // Asegúrate de que la ruta sea correcta

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, age, role = 'user' } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!first_name || !last_name || !email || !password || !age) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      role,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
};
