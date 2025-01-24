import { Router } from 'express';
import ProductManager from '../services/product.service.js'
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authorization } from '../middlewares/authorization.js';

const router = Router();

// Crear un producto (Solo administradores)

router.post('/',authenticateToken, authorization('admin'), async (req, res) => {
  try {
    const product = await ProductManager.createProduct(req.body);
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const { filter, options } = req.query; 
    const products = await ProductManager.getAllProducts(filter, options);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Actualizar un producto (Solo administradores)

router.put('/:pid', authorization('admin') , async (req, res) => {
  try {
    const updatedProduct = await ProductManager.updateProduct(req.params.pid, req.body);
    res.status(200).json({ message: 'Product updated', updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un producto (Solo administradores)

router.delete('/:pid' , authorization('admin'), async (req, res) => {
  try {
    await ProductManager.deleteProduct(req.params.pid);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
