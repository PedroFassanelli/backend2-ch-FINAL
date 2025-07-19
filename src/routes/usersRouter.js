import { Router } from 'express';
import passport from 'passport';
import { UserModel } from '../dao/models/userModel.js';
import { createHash } from '../utils/hashUtil.js';
import { isAdmin } from '../middlewares/authorization.js';

const router = Router();

//  CREATE - Crear usuario (alta)
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;
  
        const exists = await UserModel.findOne({ email });
        if (exists) return res.status(400).json({ message: 'El email ya está registrado' });
  
        const hashedPassword = createHash(password);
  
        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role
        });
  
        res.status(201).json({ message: 'Usuario creado', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
});

// READ - Obtener todos los usuarios
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const users = await UserModel.find().select('-password'); // sin password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

// READ - Obtener un usuario por ID
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
});

// UPDATE
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
    try {
        const { first_name, last_name, age, role } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, age, role },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario actualizado', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
});

// DELETE
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
});

export default router;