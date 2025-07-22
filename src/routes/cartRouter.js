import { Router } from 'express';
import passport from 'passport';
import cartController from '../controllers/cartController.js';
import isCartOwner from "../middlewares/isCartOwner.js";

const router = Router();

router.get('/:cid', cartController.getCartById);

// Crear un carrito
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  cartController.createCart
);

// Solo usuarios autenticados con rol 'user' pueden modificar su carrito
router.post('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  isCartOwner,
  cartController.addProductToCart
);

router.delete('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  isCartOwner,
  cartController.removeProduct
);

// Reemplazar productos del carrito
router.put(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  isCartOwner,
  cartController.replaceProducts
);

router.put('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  isCartOwner,
  cartController.updateQuantity
);

router.delete('/:cid',
  passport.authenticate('jwt', { session: false }),
  isCartOwner,
  cartController.clearCart
);

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), cartController.purchaseCart);

export default router;