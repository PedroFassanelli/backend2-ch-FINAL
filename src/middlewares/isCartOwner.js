import cartModel from "../dao/models/cartModel.js";

const isCartOwner = async (req, res, next) => {
  try {
    const cart = await cartModel.findById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    if (cart.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No tienes permiso para modificar este carrito" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error al validar propietario del carrito", error });
  }
};

export default isCartOwner