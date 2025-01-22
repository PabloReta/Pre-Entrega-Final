import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

class CartDAO {
  async create(cartData) {
    return await CartModel.create(cartData);
  }

  async findById(cartId) {
    return await CartModel.findById(cartId).populate('products.product').lean();
  }

  async update(cartId, updateData) {
    return await CartModel.findByIdAndUpdate(cartId, updateData, { new: true });
  }

  async delete(cartId) {
    return await CartModel.findByIdAndDelete(cartId);
  }
}

export default new CartDAO();
