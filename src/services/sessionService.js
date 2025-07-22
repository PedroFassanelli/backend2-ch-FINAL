import userRepository from '../repositories/UserRepository.js';
import { createHash, isValidPassword } from '../utils/hashUtil.js';
import { generateToken, verifyToken } from '../utils/jwtUtil.js';
import { sendRecoveryMail } from '../utils/mailerUtil.js';
import UserDTO from '../dto/UserDTO.js';

export default class SessionService {
  async register(data) {
    const { first_name, last_name, email, age, password, role } = data;

    const exists = await userRepository.getByEmail(email);
    if (exists) throw new Error('El email ya está registrado');

    const hashedPassword = createHash(password);

    return await userRepository.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      role
    });
  }

  async login(email, password) {
    const user = await userRepository.getByEmail(email);
    if (!user || !isValidPassword(user, password)) {
      throw new Error('Credenciales inválidas');
    }

    const token = generateToken(user);
    return { token, user };
  }

  getCurrent(user) {
    return new UserDTO(user);
  }

  async forgotPassword(email) {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const token = generateToken({ email }, '1h');
    const link = `http://localhost:8080/api/sessions/restore-password?token=${token}`;
    await sendRecoveryMail(email, link);

    return true;
  }

  async restorePassword(token, newPassword) {
    const decoded = verifyToken(token);
    if (!decoded) throw new Error('Token inválido o expirado');

    const user = await userRepository.getByEmail(decoded.email);
    if (!user) throw new Error('Usuario no encontrado');

    const samePassword = isValidPassword(user, newPassword);
    if (samePassword) throw new Error('La nueva contraseña no puede ser igual a la anterior');

    const hashed = createHash(newPassword);
    await userRepository.updatePassword(user._id, hashed);

    return true;
  }
}