import UserModel from '../dao/models/userModel.js';

class UserRepository {
  async getAll() {
    return await UserModel.find();
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async create(data) {
    return await UserModel.create(data);
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async update(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  async updatePassword(id, newHashedPassword) {
    return await UserModel.findByIdAndUpdate(id, { password: newHashedPassword });
  }
}

export default new UserRepository();