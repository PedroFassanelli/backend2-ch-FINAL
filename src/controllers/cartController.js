import CartRepository from '../repositories/CartRepository.js';

class CartController {
  async createCart(req, res) {
    try {
      const newCart = await CartRepository.createCart();
      res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await CartRepository.getById(req.params.cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener carrito', error });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await CartRepository.getById(cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

      const existingProduct = cart.products.find(p => p.product.toString() === pid);

      let updatedCart;
      if (existingProduct) {
        updatedCart = await CartRepository.incrementQuantity(cid, pid);
      } else {
        updatedCart = await CartRepository.addProduct(cid, pid);
      }

      res.json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar producto', error });
    }
  }

  async updateQuantity(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await CartRepository.updateProductQuantity(cid, pid, quantity);
      res.json({ message: 'Cantidad actualizada', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar cantidad', error });
    }
  }

  async removeProduct(req, res) {
    const { cid, pid } = req.params;

    try {
      const updatedCart = await CartRepository.removeProduct(cid, pid);
      res.json({ message: 'Producto eliminado del carrito', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto', error });
    }
  }

  async replaceProducts(req, res) {
    const { cid } = req.params;
    const { products } = req.body;

    try {
      const updatedCart = await CartRepository.updateAllProducts(cid, products);
      res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async clearCart(req, res) {
    const { cid } = req.params;

    try {
      const clearedCart = await CartRepository.clearCart(cid);
      res.json({ message: 'Carrito vaciado', cart: clearedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
  }
}

export default new CartController();