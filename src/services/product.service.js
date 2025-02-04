import ProductRepository from '../repositories/product.repository.js';

class ProductManager {
  async createProduct(productData) {
    return await ProductRepository.createProduct(productData);
  }

  async getAllProducts(filter = {}, options = {}) {
    return await ProductRepository.getAllProducts(filter, options);
  }

  async getProductById(productId) {
    const product = await ProductRepository.getProductById(productId);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async updateProduct(productId, updateData) {
    const updatedProduct = await ProductRepository.updateProduct(productId, updateData);
    if (!updatedProduct) throw new Error('Failed to update product');
    return updatedProduct;
  }

  async deleteProduct(productId) {
    const deletedProduct = await ProductRepository.deleteProduct(productId);
    if (!deletedProduct) throw new Error('Failed to delete product');
    return deletedProduct;
  }
}

export default new ProductManager();
