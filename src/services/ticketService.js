import TicketRepository from '../repositories/TicketRepository.js';
import { v4 as uuidv4 } from 'uuid';

class TicketService {
  async generateTicket(purchaser, amount, products) {
    const code = uuidv4();

    const ticketData = {
        code,
        amount,
        purchaser,
        products: products.map(p => ({
            product: p.product._id,
            title: p.product.title,
            quantity: p.quantity,
            price: p.product.price
        }))
    };

    return await TicketRepository.createTicket(ticketData);
  }
}

export default new TicketService();