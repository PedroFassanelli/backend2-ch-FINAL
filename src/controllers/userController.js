import UserRepository from '../repositories/UserRepository.js';
import { createHash } from '../utils/hashUtil.js';

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAll();
      res.status(200).json({ status: 'success', users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserRepository.getById(req.params.uid);
      if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      res.status(200).json({ status: 'success', user });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { first_name, last_name, email, age, password, role } = req.body;

      const exists = await UserRepository.getByEmail({ email });
      if (exists) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }

      const hashedPassword = createHash(password);

      const newUser = await UserRepository.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role
      });

      res.status(201).json({ message: 'Usuario creado', user: newUser });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ message: 'Error al crear usuario', error });
    }
  }

  async updateUser(req, res) {
    try {
      const updated = await UserRepository.update(req.params.uid, req.body);
      res.status(200).json({ status: 'success', user: updated });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const deleted = await UserRepository.delete(req.params.uid);
      res.status(200).json({ status: 'success', user: deleted });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

export default new UserController();