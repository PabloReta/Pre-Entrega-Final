import TicketDAO from '../models/Ticket.js';

class TicketRepository {
  async createTicket(ticketData) {
    return await TicketDAO.create(ticketData);
  }

  async getTicketById(ticketId) {
    return await TicketDAO.findById(ticketId);
  }

  async getAllTickets(filter = {}, options = {}) {
    return await TicketDAO.findAll(filter, options);
  }
}

export default new TicketRepository();
