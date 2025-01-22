import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

class ProductDAO {
  async create(productData) {
    return await ProductModel.create(productData);
  }

  async findAll(filter = {}, options = {}) {
    return await ProductModel.find(filter, null, options).lean();
  }

  async findById(productId) {
    return await ProductModel.findById(productId).lean();
  }

  async update(productId, updateData) {
    return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
  }

  async delete(productId) {
    return await ProductModel.findByIdAndDelete(productId);
  }
}

export default new ProductDAO();
