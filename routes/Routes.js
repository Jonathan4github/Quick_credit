import express from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidator from '../middlewares/validators/AuthValidator';
import UserController from '../controllers/UserController';
import UserValidator from '../middlewares/validators/UserValidator';
import loanController from '../controllers/LoanController';


const router = express.Router();

router.route('/auth/signup/')
  .post(AuthValidator.Signup, AuthController.signup);
router.route('/auth/signin')
  .post(AuthValidator.Signin, AuthController.signin);
router.route('/users/:email/verify')
  .patch(UserValidator.verifyUser, UserController.markVerified);
router.route('/loans/:id/')
  .get(loanController.fineOne);

export default router;