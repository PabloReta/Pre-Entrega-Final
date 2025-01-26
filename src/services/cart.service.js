import CartRepository from '../dao/repositories/cart.repository.js';
import ProductRepository from '../dao/repositories/product.repository.js';
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
    if (!cart) throw new Error("Cart not found");
  
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
          title: product.title, // Agregamos el título del producto
          quantity: item.quantity,
          price: product.price, // Incluimos el precio del producto procesado
        });
      } else {
        // Producto sin stock suficiente
        unprocessedProducts.push({
          product: item.product,
          title: product ? product.title : "Unknown Product",
          quantity: item.quantity,
        });
      }
    }
  
    if (processedProducts.length > 0) {
      const totalAmount = processedProducts.reduce(
        (total, item) => total + item.quantity * item.price, // Calculamos el monto total procesado
        0
      );
  
      const ticket = await TicketManager.createTicket({
        amount: totalAmount,
        purchaser,
      });
  
      // Si no hay productos no procesados, eliminamos el carrito
      if (unprocessedProducts.length === 0) {
        await CartRepository.deleteCart(cartId);
      } else {
        // Actualizamos el carrito con los productos no procesados
        cart.products = unprocessedProducts;
        await CartRepository.updateCart(cartId, { products: unprocessedProducts });
      }
  
      return {
        message: "Purchase completed successfully",
        ticketId: ticket._id,
        totalProcessedAmount: totalAmount,
        processedProducts,
        unprocessedProducts,
      };
    } else {
      throw new Error("No products were processed due to insufficient stock");
    }
  }
  
  
}

export default new CartManager();

