import ProductModel from '../dao/models/productModel.js';

class ProductRepository {
  async getAll() {
    return await ProductModel.find();
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async create(productData) {
    return await ProductModel.create(productData);
  }

  async updateById(id, updateData) {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async getByCategory(category) {
    return await ProductModel.find({ category });
  }

  async updateStock(productId, quantity) {
    return await ProductModel.findByIdAndUpdate(
      productId,
      { $inc: { stock: -quantity } },
      { new: true }
    );
  }
}

export default new ProductRepository();