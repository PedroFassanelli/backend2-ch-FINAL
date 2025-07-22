import SessionService from '../services/sessionService.js';
const sessionService = new SessionService();

export default class SessionController {
  static async register(req, res) {
    try {
      const user = await sessionService.register(req.body);
      res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = await sessionService.login(email, password);
      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  static async current(req, res) {
    try {
      const dto = sessionService.getCurrent(req.user);
      res.status(200).json({ user: dto });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async forgotPassword(req, res) {
    try {
      await sessionService.forgotPassword(req.body.email);
      res.json({ message: 'Correo enviado con el enlace de recuperación' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async restorePassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      await sessionService.restorePassword(token, newPassword);
      res.send('Contraseña actualizada correctamente');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}