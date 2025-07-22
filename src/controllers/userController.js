import UserService from "../services/userService.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ status: "success", users });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.uid);
      if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      res.status(200).json({ status: "success", user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({ status: "success", user: newUser });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.uid, req.body);
      res.status(200).json({ status: "success", user: updatedUser });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.uid);
      res.status(200).json({ status: "success", user: deletedUser });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

}

export default new UserController();