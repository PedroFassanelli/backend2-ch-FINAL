import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import productController from '../controllers/productController.js';

const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  productController.create
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  productController.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  productController.delete
);


export default router;