import TicketDBManager from '../dao/ticketDBManager.js';

const ticketDAO = new TicketDBManager();

class TicketRepository {
  createTicket = (data) => ticketDAO.createTicket(data);
  getTicketByCode = (code) => ticketDAO.getTicketByCode(code);
}

export default new TicketRepository();