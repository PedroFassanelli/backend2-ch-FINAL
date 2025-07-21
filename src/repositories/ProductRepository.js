export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = () => this.dao.getAllProducts();
  getProductByID = (pid) => this.dao.getProductByID(pid);
  createProduct = (productData) => this.dao.createProduct(productData);
  updateProduct = (pid, updateData) => this.dao.updateProduct(pid, updateData);
  deleteProduct = (pid) => this.dao.deleteProduct(pid);
}