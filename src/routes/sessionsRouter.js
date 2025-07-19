import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from 'passport';
import { UserModel } from '../dao/models/userModel.js';
import { isValidPassword } from '../utils/hashUtil.js';

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await UserModel.findOne({ email });

        if (!user || !isValidPassword(user, password)) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            id: user._id,
            role: user.role,
            email: user.email
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
      res.status(500).json({ message: 'Error al hacer login', error });
    }
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
    });
});

export default router;