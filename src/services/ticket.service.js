import TicketRepository from '../dao/repositories/ticket.repository.js';
import { v4 as uuidv4 } from 'uuid';
import ProductManager from './product.service.js';
import CartManager from './cart.service.js';

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

  async processPurchase(cartId, purchaserEmail) {
    const cart = await CartManager.getCartById(cartId);
    if (!cart || cart.products.length === 0) {
      throw new Error('El carrito está vacío o no existe');
    }

    let totalAmount = 0;
    const failedProducts = [];

    for (const cartProduct of cart.products) {
      const product = await ProductManager.getProductById(cartProduct.product._id);

      if (product.stock >= cartProduct.quantity) {
        product.stock -= cartProduct.quantity;
        totalAmount += product.price * cartProduct.quantity;

        await ProductManager.updateProduct(product._id, { stock: product.stock });
      } else {
        failedProducts.push({
          productId: product._id,
          productName: product.name,
          availableStock: product.stock,
          requestedQuantity: cartProduct.quantity,
        });
      }
    }

    if (totalAmount > 0) {
      await this.createTicket({
        amount: totalAmount,
        purchaser: purchaserEmail,
      });
    }

    cart.products = failedProducts.map((failedProduct) => ({
      product: failedProduct.productId,
      quantity: failedProduct.requestedQuantity,
    }));

    await CartManager.updateCart(cartId, cart);

    return {
      success: totalAmount > 0,
      totalAmount,
      failedProducts,
    };
  }
}

export default new TicketManager();
