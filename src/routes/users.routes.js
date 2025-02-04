import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  publicRoute,
  getProfile,
  adminRoute,
  getCurrentUser,
  githubCallback,
} from "../controllers/user.controller.js";

const router = Router();

// Registro
router.post(
  "/register",
  passport.authenticate("register", { session: false, failureRedirect: "/api/users/failRegister" }),
  registerUser
);

// Inicio de sesión
router.post(
  "/login",
  passport.authenticate("login", { session: false, failureRedirect: "/api/users/failLogin" }),
  loginUser
);

// Cierre de sesión
router.get("/logout", logoutUser);

// Ruta pública
router.get("/public", publicRoute);

// Perfil del usuario
router.get("/profile", authenticateToken, getProfile);

// Ruta para administradores
router.get("/admin", authenticateToken, authorization("admin"), adminRoute);

// Información del usuario actual
router.get("/current", authenticateToken, getCurrentUser);

// Autenticación con GitHub
router.get("/github", passport.authenticate("github", { session: false }));
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/api/users/failLogin", session: false }),
  githubCallback
);

export default router;


