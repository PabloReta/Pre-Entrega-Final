import TicketModel from '../models/Ticket.js';

class TicketDAO {
  async create(ticketData) {
    return await TicketModel.create(ticketData);
  }

  async findById(ticketId) {
    return await TicketModel.findById(ticketId).lean();
  }

  async findAll(filter = {}, options = {}) {
    return await TicketModel.find(filter, null, options).lean();
  }
}

export default new TicketDAO();
