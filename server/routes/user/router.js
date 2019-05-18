import express from 'express';
import UserController from '../../controllers/UserController';
import UserValidator from '../../middlewares/validators/UserValidator';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';

const router = express.Router();

const { roleValidation, verifyValidation } = UserValidator;
const { role, markVerified } = UserController;

router.route('/users/role/')
  .post(roleValidation, role);
router.route('/users/:email/verify')
  .patch(Auth.verifyToken, isAdmin, verifyValidation, markVerified);

export default router;
