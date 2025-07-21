export default class CartService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  getAllCarts = () => this.cartRepository.getAllCarts();

  getCartById = (cid) => this.cartRepository.getProductsFromCartByID(cid);

  createCart = (uid) => this.cartRepository.createCart(uid);

  addProduct = (cid, pid) => this.cartRepository.addProductByID(cid, pid);

  deleteProduct = (cid, pid) => this.cartRepository.deleteProductByID(cid, pid);

  updateAllProducts = (cid, products) => this.cartRepository.updateAllProducts(cid, products);

  updateProductQuantity = (cid, pid, quantity) => this.cartRepository.updateProductByID(cid, pid, quantity);

  deleteAllProducts = (cid) => this.cartRepository.deleteAllProducts(cid);
}