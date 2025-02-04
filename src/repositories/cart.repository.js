//Aplicando correccion
//import CartDAO from '../models/Cart.js.js';
import CartDAO from '../dao/CartDao.js';


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
