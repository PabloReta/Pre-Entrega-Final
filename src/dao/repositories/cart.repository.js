import CartDAO from '../models/Cart.js.js';

class CartRepository {
  async createCart(cartData) {
    return await CartDAO.create(cartData);
  }

  async getCartById(cartId) {
    return await CartDAO.findById(cartId);
  }

  async updateCart(cartId, updateData) {
    return await CartDAO.update(cartId, updateData);
  }

  async deleteCart(cartId) {
    return await CartDAO.delete(cartId);
  }
}

export default new CartRepository();
