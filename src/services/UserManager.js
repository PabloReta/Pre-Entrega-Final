import UserRepository from '../repositories/user.repository.js';

class UserManager {
  async createUser(userData) {
    return await UserRepository.createUser(userData);
  }

  async getUserByEmail(email) {
    return await UserRepository.getUserByEmail(email);
  }

  async getUserById(userId) {
    return await UserRepository.getUserById(userId);
  }

  async updateUser(userId, updateData) {
    return await UserRepository.updateUser(userId, updateData);
  }

  async deleteUser(userId) {
    return await UserRepository.deleteUser(userId);
  }
}

export default new UserManager();
