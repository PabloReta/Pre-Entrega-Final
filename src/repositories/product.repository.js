import ProductDAO from '../dao/ProductDAO.js';


class ProductRepository {
  async createProduct(productData) {
    return await ProductDAO.create(productData);
  }

  async getAllProducts(filter = {}, options = {}) {
    return await ProductDAO.findAll(filter, options);
  }

  async getProductById(productId) {
    return await ProductDAO.findById(productId);
  }

  async updateProduct(productId, updateData) {
    return await ProductDAO.update(productId, updateData);
  }

  async deleteProduct(productId) {
    return await ProductDAO.delete(productId);
  }
}

export default new ProductRepository();
