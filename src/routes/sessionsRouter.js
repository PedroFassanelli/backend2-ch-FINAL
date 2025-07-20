import { Router } from 'express';
import passport from 'passport';
import sessionController from '../controllers/sessionController.js';

const router = Router();

router.post('/register', sessionController.register);
router.post('/login', sessionController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), sessionController.current);
router.post('/forgot-password', sessionController.forgotPassword);
router.get('/restore-password', (req, res) => {
  const { token } = req.query;
  res.render('restore-password', { token });
});
router.post('/restore-password', sessionController.restorePassword);


export default router;