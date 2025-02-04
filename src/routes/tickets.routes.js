import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorization } from "../middlewares/authorization.js";

import {
  createTicket,
  getTicketById,
  getAllTickets,
} from "../controllers/ticket.controller.js";

const router = Router();

// Crear un ticket (Solo usuarios)
router.post("/", authenticateToken, authorization("user"), createTicket);

// Obtener un ticket por ID
router.get("/:tid", getTicketById);

// Obtener todos los tickets
router.get("/", getAllTickets);

export default router;





