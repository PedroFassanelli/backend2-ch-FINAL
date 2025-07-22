import UserRepository from "../repositories/UserRepository.js";
import { createHash } from "../utils/hashUtil.js";

class UserService {
  async getAllUsers() {
    return await UserRepository.getAll();
  }
  
  async getUserById(uid) {
    return await UserRepository.getById(uid);
  }

  async createUser(data) {
    const { email, password } = data;

    const existingUser = await UserRepository.getByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const hashedPassword = createHash(password);
    return await UserRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async updateUser(uid, updateData) {
    return await UserRepository.update(uid, updateData);
  }

  async deleteUser(uid) {
    return await UserRepository.delete(uid);
  }
}

export default new UserService();