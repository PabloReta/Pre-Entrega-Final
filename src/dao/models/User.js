// src/dao/models/User.js

import mongoose from 'mongoose';

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

// Crear el modelo de usuario
const UserModel = mongoose.model('User', userSchema);

// Definir el DAO de usuario
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

// Exportar la instancia del DAO de usuario
export default new UserDAO();




// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   first_name: { type: String, required: true },
//   last_name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   age: { type: Number, required: true },
//   role: { type: String, enum: ['admin', 'user'], default: 'user' },
// });

// export default mongoose.model('User', userSchema);
