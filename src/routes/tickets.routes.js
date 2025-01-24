import { Router } from 'express';
import TicketManager from '../services/ticket.service.js';
//import { isUser } from '../middlewares/auth.middleware.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authorization } from "../middlewares/authorization.js";

const router = Router();

// Crear un ticket (Solo usuarios)

// Por ahora savo el middleware de autenticacion hasta que funcione **isUser**
router.post('/', authenticateToken , authorization('user'), async (req, res) => {
  try {
    const { amount, purchaser } = req.body;
    const ticket = await TicketManager.createTicket({ amount, purchaser });
    res.status(201).json({ message: 'Ticket created', ticket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un ticket por ID
router.get('/:tid', async (req, res) => {
  try {
    const ticket = await TicketManager.getTicketById(req.params.tid);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await TicketManager.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;



