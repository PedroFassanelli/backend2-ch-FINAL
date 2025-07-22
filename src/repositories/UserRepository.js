import UserDBManager from "../dao/userDBManager.js";

const userDAO = new UserDBManager();

class UserRepository {
  getAll = () => userDAO.getAll();
  getById = (uid) => userDAO.getById(uid);
  getByEmail = (email) => userDAO.getByEmail(email);
  create = (data) => userDAO.create(data);
  update = (uid, data) => userDAO.update(uid, data);
  delete = (uid) => userDAO.delete(uid);
  updatePassword = (uid, newPassword) => userDAO.updatePassword(uid, newPassword);
}

export default new UserRepository();