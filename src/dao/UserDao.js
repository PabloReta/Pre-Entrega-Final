import UserModel from '../models/User.js';

class UserDAO {
  async create(userData) {
    return await UserModel.create(userData);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email }).lean();
  }

  async findById(userId) {
    return await UserModel.findById(userId).lean();
  }

  async update(userId, updateData) {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async delete(userId) {
    return await UserModel.findByIdAndDelete(userId);
  }
}

export default new UserDAO();
