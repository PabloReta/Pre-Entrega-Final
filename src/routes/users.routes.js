import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { generateToken } from "../utils/generateToken.js";

const router = Router();

// Ruta de registro
// Ruta de registro
router.post(
    "/register",
    passport.authenticate("register", {
      session: false,
      failureRedirect: "/api/users/failRegister",
    }),
    async (req, res) => {
      try {
        if (!req.user) return res.status(403).send("Registration failure");
        const token = generateToken(req.user);
  
        // Respuesta mejorada con toda la información del usuario registrado
        res
          .cookie("preEntregaFinal", token, { httpOnly: true })
          .status(201)  // Código HTTP 201 para "Creado"
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
    }
  );
  

// Ruta de inicio de sesión
router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/users/failLogin",
  }),
  async (req, res) => {
    try {
      if (!req.user) return res.status(403).send("Login failure");

      // Genera el token
      const token = generateToken(req.user);

      // Envía el token en el cuerpo de la respuesta
      res.json({ message: "User login successful", token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// Ruta de cierre de sesión
router.get("/logout", (req, res) => {
  res.clearCookie("preEntregaFinal");
  res.json({ message: "User logged out" });
});

// Ruta protegida para perfil de usuario
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.status(200).json({ first_name, last_name, email, role });
  }
);

// Ruta pública (accesible por cualquier usuario)
router.get("/public", (req, res) => {
  res.send("This is a public route accessible to anyone.");
});

// Ruta protegida solo para administradores
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  (req, res) => {
    res.send("This route is accessible only to admins.");
  }
);

// Rutas para autenticación con GitHub
router.get("/github", passport.authenticate("github", { session: false }));

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/api/users/failLogin",
    session: false,
  }),
  (req, res) => {
    try {
      if (!req.user)
        return res.status(401).json({ message: "Invalid credentials" });
      const token = generateToken(req.user);
      res
        .cookie("preEntregaFinal", token, { httpOnly: true })
        .send("User authenticated with GitHub");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

export default router;
