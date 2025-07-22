import TicketService from "./ticketService.js";
import { ProductService } from '../repositories/index.js'; 
import { v4 as uuidv4 } from "uuid";

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

  purchaseCart = async (cid, userEmail) => {
    const cart = await this.cartRepository.getProductsFromCartByID(cid);
    const productsWithoutStock = [];
    const productsToBuy = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await ProductService.getProductByID(item.product._id);

      if (product.stock >= item.quantity) {
        // Hay stock suficiente
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await ProductService.updateProduct(product._id, product);

        productsToBuy.push(item);
      } else {
        // No hay stock
        productsWithoutStock.push(item);
      }
    }

    // Actualizar el carrito con solo los productos que no se pudieron comprar
    await this.cartRepository.updateAllProducts(
      cid,
      productsWithoutStock.map(p => ({
        product: p.product._id,
        quantity: p.quantity,
      }))
    );

    // Si no se pudo comprar nada, no generamos ticket
    if (productsToBuy.length === 0) {
      return {
        message: "No se pudo comprar ningún producto por falta de stock",
        ticket: null,
        productsWithoutStock: productsWithoutStock.map(p => p.product._id),
      };
    }

    const ticket = await TicketService.generateTicket(userEmail, totalAmount, productsToBuy);

    return {
      message: "Compra procesada",
      ticket,
      productsWithoutStock: productsWithoutStock.map(p => p.product._id),
    };
  };
}