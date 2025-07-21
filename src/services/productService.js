export default class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  getAllProducts = () => this.productRepository.getAllProducts();

  getProductByID = (pid) => this.productRepository.getProductByID(pid);

  createProduct = (productData) => this.productRepository.createProduct(productData);

  updateProduct = (pid, updateData) => this.productRepository.updateProduct(pid, updateData);

  deleteProduct = (pid) => this.productRepository.deleteProduct(pid);
}