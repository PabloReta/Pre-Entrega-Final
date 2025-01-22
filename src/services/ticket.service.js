import TicketRepository from '../dao/repositories/ticket.repository.js';
import { v4 as uuidv4 } from 'uuid';

class TicketManager {
  async createTicket({ amount, purchaser }) {
    const ticketData = {
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    };

    return await TicketRepository.createTicket(ticketData);
  }

  async getTicketById(ticketId) {
    const ticket = await TicketRepository.getTicketById(ticketId);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  }

  async getAllTickets(filter = {}, options = {}) {
    return await TicketRepository.getAllTickets(filter, options);
  }
}

export default new TicketManager();
