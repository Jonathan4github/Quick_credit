import express from 'express';
import AuthController from '../../controllers/AuthController';
import AuthValidator from '../../middlewares/validators/AuthValidator';
import AuthTokenOrPassword from '../../middlewares/AuthTokenOrPassword';

const router = express.Router();

const { verify } = AuthTokenOrPassword;

router.route('/auth/signup/')
  .post(AuthValidator.Signup, AuthController.signup);
router.route('/auth/signin')
  .post(verify, AuthValidator.Signin, AuthController.signin);

export default router;
