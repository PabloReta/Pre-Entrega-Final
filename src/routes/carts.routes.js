import { Router } from 'express';
import CartManager from '../services/cart.service.js';
import TicketManager from '../services/ticket.service.js';

import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authorization } from "../middlewares/authorization.js";

const router = Router();

// Crear un carrito
router.post('/', async (req, res) => {
  try {
    const cart = await CartManager.createCart(req.body);
    res.status(201).json({ message: 'Cart created', cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Agregar producto al carrito (Solo usuarios)
router.post('/:cid/products/:pid', authenticateToken, authorization('user'), async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await CartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un carrito
router.delete('/:cid', async (req, res) => {
  try {
    await CartManager.deleteCart(req.params.cid);
    res.status(200).json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Procesar compra (Solo usuarios)
router.post('/:cid/purchase', authenticateToken, authorization('user'), async (req, res) => {
  try {
    const cartId = req.params.cid;
    const purchaser = req.user.email;

    const result = await CartManager.purchaseCart(cartId, purchaser);

    res.status(200).json({
      message: 'Purchase completed',
      processedProducts: result.processedProducts,
      unprocessedProducts: result.unprocessedProducts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
