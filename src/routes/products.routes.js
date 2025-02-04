import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorization } from "../middlewares/authorization.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Crear un producto (Solo administradores)
router.post("/", authenticateToken, authorization("admin"), createProduct);

// Obtener todos los productos
router.get("/", getAllProducts);

// Obtener producto por ID
router.get("/:pid", getProductById);

// Actualizar un producto (Solo administradores)
router.put("/:pid", authenticateToken, authorization("admin"), updateProduct);

// Eliminar un producto (Solo administradores)
router.delete("/:pid", authenticateToken, authorization("admin"), deleteProduct);

export default router;



