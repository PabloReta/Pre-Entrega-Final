import CartRepository from '../dao/repositories/cart.repository.js';
import ProductRepository from '../dao/repositories/product.repository.js';


class CartManager {
  async createCart(cartData) {
    return await CartRepository.createCart(cartData);
  }

  async getCartById(cartId) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');
    return cart;
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    const product = await ProductRepository.getProductById(productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) throw new Error('Not enough stock');

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    product.stock -= quantity;
    await ProductRepository.updateProduct(productId, { stock: product.stock });

    return await CartRepository.updateCart(cartId, { products: cart.products });
  }

  async deleteCart(cartId) {
    const deletedCart = await CartRepository.deleteCart(cartId);
    if (!deletedCart) throw new Error('Failed to delete cart');
    return deletedCart;
  }
}

export default new CartManager();
