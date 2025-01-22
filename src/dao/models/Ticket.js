import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

const TicketModel = mongoose.model('Ticket', ticketSchema);

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
