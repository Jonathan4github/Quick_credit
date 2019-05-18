import express from 'express';
import UserController from '../../controllers/UserController';
import UserValidator from '../../middlewares/validators/UserValidator';

const router = express.Router();

router.route('/users/role/')
  .post(UserValidator.roleValidation, UserController.role);


export default router;
