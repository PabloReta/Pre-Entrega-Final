import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorization } from "../middlewares/authorization.js";

import {
  createCart,
  getCartById,
  addProductToCart,
  deleteCart,
  purchaseCart,
} from "../controllers/cart.controller.js";

const router = Router();

// Crear un carrito
router.post("/", createCart);

// Obtener un carrito por ID
router.get("/:cid", getCartById);

// Agregar producto al carrito (Solo usuarios)
router.post("/:cid/products/:pid", authenticateToken, authorization("user"), addProductToCart);

// Eliminar un carrito
router.delete("/:cid", deleteCart);

// Procesar compra (Solo usuarios)
router.post("/:cid/purchase", authenticateToken, authorization("user"), purchaseCart);

export default router;





