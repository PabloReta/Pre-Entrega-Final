import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketManager from './ticket.service.js';

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
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await CartRepository.updateCart(cartId, { products: cart.products });
  }

  async deleteCart(cartId) {
    const deletedCart = await CartRepository.deleteCart(cartId);
    if (!deletedCart) throw new Error('Failed to delete cart');
    return deletedCart;
  }

  async purchaseCart(cartId, purchaser) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');

    const products = cart.products;
    const processedProducts = [];
    const unprocessedProducts = [];

    for (const item of products) {
      const product = await ProductRepository.getProductById(item.product);

      if (product && product.stock >= item.quantity) {
        // Producto con stock suficiente
        product.stock -= item.quantity;
        await ProductRepository.updateProduct(product._id, { stock: product.stock });

        processedProducts.push({
          product: product._id,
          title: product.title,
          quantity: item.quantity,
          price: product.price,
        });
      } else {
        // Producto sin stock suficiente
        unprocessedProducts.push({
          product: item.product,
          title: product ? product.title : 'Unknown Product',
          quantity: item.quantity,
        });
      }
    }

    let ticket = null;
    let totalProcessedAmount = 0;

    // Crear el ticket solo si hay productos procesados
    if (processedProducts.length > 0) {
      totalProcessedAmount = processedProducts.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      ticket = await TicketManager.createTicket({
        amount: totalProcessedAmount,
        purchaser,
      });
    }

    // Actualizar el carrito con los productos no procesados o eliminarlo si está vacío
    if (unprocessedProducts.length === 0) {
      await CartRepository.deleteCart(cartId);
    } else {
      cart.products = unprocessedProducts;
      await CartRepository.updateCart(cartId, { products: unprocessedProducts });
    }

    return {
      message: processedProducts.length > 0
        ? 'Purchase completed successfully'
        : 'No products were processed due to insufficient stock',
      ticketId: ticket ? ticket._id : null,
      totalProcessedAmount,
      processedProducts,
      unprocessedProducts,
    };
  }
}

export default new CartManager();

