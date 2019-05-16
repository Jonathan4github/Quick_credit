import express from 'express';
import AuthController from '../../controllers/AuthController';
import AuthValidator from '../../middlewares/validators/AuthValidator';

const router = express.Router();

router.route('/auth/signup/')
  .post(AuthValidator.Signup, AuthController.signup);

export default router;
