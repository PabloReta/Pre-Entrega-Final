import CartManager from "../services/cart.service.js";

// Crear un carrito
export const createCart = async (req, res) => {
  try {
    const cart = await CartManager.createCart(req.body);
    res.status(201).json({ message: "Cart created", cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un carrito por ID
export const getCartById = async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await CartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un carrito
export const deleteCart = async (req, res) => {
  try {
    await CartManager.deleteCart(req.params.cid);
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Procesar compra
export const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const purchaser = req.user.email;

    const result = await CartManager.purchaseCart(cartId, purchaser);

    res.status(200).json({
      message: result.message,
      ticketId: result.ticketId,
      totalProcessedAmount: result.totalProcessedAmount,
      processedProducts: result.processedProducts,
      unprocessedProducts: result.unprocessedProducts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
