import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import cartController from '../controllers/cartController.js';

const router = Router();

router.get('/:cid', cartController.getCartById);

// Crear un carrito
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  cartController.createCart
);

// Solo usuarios autenticados con rol 'user' pueden modificar su carrito
router.post('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  cartController.addProductToCart
);

router.delete('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  cartController.removeProduct
);

// Reemplazar productos del carrito
router.put(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  cartController.replaceProducts
);

router.put('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  cartController.updateQuantity
);

router.delete('/:cid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  cartController.clearCart
);

export default router;