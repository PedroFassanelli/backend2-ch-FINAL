import ticketModel from './models/ticketModel.js';

export default class TicketDBManager {
  async createTicket(data) {
    return await ticketModel.create(data);
  }

  async getTicketByCode(code) {
    return await ticketModel.findOne({ code });
  }
}