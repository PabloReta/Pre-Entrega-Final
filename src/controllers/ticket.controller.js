import TicketManager from "../services/ticket.service.js";

// Crear un ticket (Solo usuarios)
export const createTicket = async (req, res) => {
  try {
    const { amount, purchaser } = req.body;
    const ticket = await TicketManager.createTicket({ amount, purchaser });
    res.status(201).json({ message: "Ticket created", ticket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un ticket por ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await TicketManager.getTicketById(req.params.tid);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketManager.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
