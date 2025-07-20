import userRepository from '../repositories/UserRepository.js';
import { createHash, isValidPassword } from '../utils/hashUtil.js';
import { generateToken, verifyToken } from '../utils/jwtUtil.js';
import { sendRecoveryMail } from '../utils/mailerUtil.js'; 
import UserDTO from '../dto/UserDTO.js';

export default class SessionController {
  static async register(req, res) {
    try {
      const { first_name, last_name, email, age, password, role } = req.body;

      const exists = await userRepository.getByEmail(email);
      if (exists) return res.status(400).json({ message: 'El email ya está registrado' });

      const hashedPassword = createHash(password);

      const user = await userRepository.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role
      });

      res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
      console.error('Error en register:', error);
      res.status(500).json({ message: 'Error en el registro', error });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.getByEmail(email);
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

      const validPassword = isValidPassword(user, password);
      if (!validPassword) return res.status(401).json({ message: 'Credenciales inválidas' });

      const token = generateToken(user);

      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error en el login', error });
    }
  }

  static async current(req, res) {
    try {
      const dto = new UserDTO(req.user);
      res.status(200).json({ user: dto });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario actual', error });
    }
  }

  static async forgotPassword(req, res) {
    try {
        const { email } = req.body;

        const user = await userRepository.getByEmail(email);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const token = generateToken({ email }, '1h');

        const recoveryLink = `http://localhost:8080/api/sessions/restore-password?token=${token}`;
        await sendRecoveryMail(email, recoveryLink);

        res.json({ message: 'Correo enviado con el enlace de recuperación' });
    } catch (error) {
        console.error('Error en forgotPassword:', error);
        res.status(500).json({ message: 'Error al enviar correo de recuperación', error });
    }
  }

  static async restorePassword(req, res) {
    try {
        const { token, newPassword } = req.body;
        const decoded = verifyToken(token);
        if (!decoded) return res.status(400).send('Token inválido o expirado');

        const user = await userRepository.getByEmail(decoded.email);
        if (!user) return res.status(404).send('Usuario no encontrado');

        const samePassword = isValidPassword(user, newPassword);
        if (samePassword) return res.status(400).send('La nueva contraseña no puede ser igual a la anterior');

        const hashedPassword = createHash(newPassword);
        await userRepository.updatePassword(user._id, hashedPassword);

        res.send('Contraseña actualizada correctamente');
    } catch (error) {
        console.error('Error en restorePassword:', error);
        res.status(500).send('Error al restablecer la contraseña');
    }
  }
}