import userModel from "./models/userModel.js";

class userDBManager {
  getAll() {
    return userModel.find();
  }

  getById(uid) {
    return userModel.findById(uid);
  }

  getByEmail(email) {
    return userModel.findOne({ email });
  }

  create(userData) {
    return userModel.create(userData);
  }

  update(uid, updateData) {
    return userModel.findByIdAndUpdate(uid, updateData, { new: true });
  }

  delete(uid) {
    return userModel.findByIdAndDelete(uid);
  }

  async updatePassword(uid, hashedPassword) {
    return await userModel.findByIdAndUpdate(uid, { password: hashedPassword }, { new: true });
  }
}

export default userDBManager;