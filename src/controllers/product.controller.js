import ProductManager from "../services/product.service.js";

// Crear un producto (Solo administradores)
export const createProduct = async (req, res) => {
  try {
    const product = await ProductManager.createProduct(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const { filter, options } = req.query;
    const products = await ProductManager.getAllProducts(filter, options);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar un producto (Solo administradores)
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductManager.updateProduct(req.params.pid, req.body);
    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto (Solo administradores)
export const deleteProduct = async (req, res) => {
  try {
    await ProductManager.deleteProduct(req.params.pid);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
