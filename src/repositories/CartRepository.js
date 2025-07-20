import CartModel from '../dao/models/cartModel.js';

class CartRepository {
  async getById(cartId) {
    return await CartModel.findById(cartId).populate('products.product');
  }

  async create(cartData) {
    return await CartModel.create(cartData);
  }

  async createCart() {
    return await CartModel.create({ products: [] });
  }

  async addProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async incrementQuantity(cartId, productId) {
    return await CartModel.findOneAndUpdate(
      { _id: cartId, 'products.product': productId },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    );
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return await CartModel.findOneAndUpdate(
      { _id: cartId, 'products.product': productId },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    );
  }

  async removeProduct(cartId, productId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );
  }

  async updateAllProducts(cid, products) {
    return await CartModel.findByIdAndUpdate(cid, { products }, { new: true });
  }

  async clearCart(cartId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true }
    );
  }
}

export default new CartRepository();