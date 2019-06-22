import express from 'express';
import UserController from '../../controllers/UserController';
import UserValidator from '../../middlewares/validators/UserValidator';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';


const router = express.Router();

const { roleValidation, verifyValidation } = UserValidator;
const { role, markVerified, getAll } = UserController;
const { verifyToken } = Auth;

router.route('/users/role/')
  .post(roleValidation, role);
router.route('/users/:email/verify')
  .patch(verifyToken, isAdmin, verifyValidation, markVerified);
router.route('/users/')
  .get(verifyToken, isAdmin, getAll);

export default router;
