import { generateToken } from "../utils/generateToken.js";

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    if (!req.user) return res.status(403).send("Registration failure");

    const token = generateToken(req.user);

    res
      .cookie("preEntregaFinal", token, { httpOnly: true })
      .status(201)
      .json({
        message: "Usuario registrado exitosamente",
        user: {
          _id: req.user._id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          age: req.user.age,
          role: req.user.role,
        },
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Inicio de sesión
export const loginUser = async (req, res) => {
  try {
    if (!req.user) return res.status(403).send("Login failure");

    const token = generateToken(req.user);
    res.json({ message: "User login successful", token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Cierre de sesión
export const logoutUser = (req, res) => {
  res.clearCookie("preEntregaFinal");
  res.json({ message: "User logged out" });
};

// Ruta pública
export const publicRoute = (req, res) => {
  res.send("This is a public route accessible to anyone.");
};

// Perfil del usuario
export const getProfile = (req, res) => {
  res.json({
    message: "User profile",
    user: req.user,
  });
};

// Ruta para administradores
export const adminRoute = (req, res) => {
  res.json({
    message: "Welcome, admin!",
    admin: req.user,
  });
};

// Información del usuario actual
export const getCurrentUser = (req, res) => {
  res.json({
    message: "Current user data",
    user: req.user,
  });
};

// Autenticación con GitHub
export const githubCallback = (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(req.user);

    res
      .cookie("preEntregaFinal", token, { httpOnly: true })
      .send("User authenticated with GitHub");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

