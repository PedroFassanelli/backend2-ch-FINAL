export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllCarts = () => this.dao.getAllCarts();
  getProductsFromCartByID = (cid) => this.dao.getProductsFromCartByID(cid);
  createCart = (uid) => this.dao.createCart(uid);
  addProductByID = (cid, pid) => this.dao.addProductByID(cid, pid);
  deleteProductByID = (cid, pid) => this.dao.deleteProductByID(cid, pid);
  updateAllProducts = (cid, products) => this.dao.updateAllProducts(cid, products);
  updateProductByID = (cid, pid, quantity) => this.dao.updateProductByID(cid, pid, quantity);
  deleteAllProducts = (cid) => this.dao.deleteAllProducts(cid);
}