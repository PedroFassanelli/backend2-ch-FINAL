import { CartService } from "../repositories/index.js";

class CartController {
  async createCart(req, res) {
    try {
      const userId = req.user._id;
      const newCart = await CartService.createCart(userId);
      res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await CartService.getCartById(req.params.cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener carrito', error });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await CartService.getCartById(cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

      let updatedCart;

      updatedCart = await CartService.addProduct(cid, pid);
      
      res.json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error al agregar producto', error });
    }
  }

  async updateQuantity(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await CartService.updateProductQuantity(cid, pid, quantity);
      res.json({ message: 'Cantidad actualizada', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar cantidad', error });
    }
  }

  async removeProduct(req, res) {
    const { cid, pid } = req.params;

    try {
      const updatedCart = await CartService.deleteProduct(cid, pid);
      res.json({ message: 'Producto eliminado del carrito', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto', error });
    }
  }

  async replaceProducts(req, res) {
    const { cid } = req.params;
    const { products } = req.body;

    try {
      const updatedCart = await CartService.updateAllProducts(cid, products);
      res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async clearCart(req, res) {
    const { cid } = req.params;

    try {
      const clearedCart = await CartService.deleteAllProducts(cid);
      res.json({ message: 'Carrito vaciado', cart: clearedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
  }
}

export default new CartController();