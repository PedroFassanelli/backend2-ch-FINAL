import { productDBManager } from "../dao/productDBManager.js";
import { cartDBManager } from "../dao/cartDBManager.js";

import ProductRepository from "./ProductRepository.js";
import CartRepository from "./CartRepository.js";

import CartServiceClass  from "../services/cartService.js";
import ProductServiceClass from "../services/productService.js";

// Instanciar DAOs
const productDAO = new productDBManager();
const cartDAO = new cartDBManager(productDAO);

// Instanciar Repositories
export const productRepository  = new ProductRepository(productDAO);
export const cartRepository  = new CartRepository(cartDAO);

// Instanciar Services
export const CartService = new CartServiceClass(cartRepository);
export const ProductService = new ProductServiceClass(productRepository);