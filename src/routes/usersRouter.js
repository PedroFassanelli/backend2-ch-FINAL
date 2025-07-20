import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import UserController from '../controllers/userController.js';

const router = Router();

//  CREATE - Crear usuario (alta)
router.post('/', UserController.createUser);

// READ - Obtener todos los usuarios
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  UserController.getAllUsers
);

// READ - Obtener un usuario por ID
router.get(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  UserController.getUserById
);

// UPDATE
router.put(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  UserController.updateUser
);

// DELETE
router.delete(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  UserController.deleteUser
);

export default router;