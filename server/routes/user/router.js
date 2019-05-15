import express from 'express';
import UserController from '../../controllers/UserController';
import UserValidator from '../../middlewares/validators/UserValidator';

const router = express.Router();
const { verifyUser } = UserValidator;
const { markVerified } = UserController;

router.route('/users/:email/verify')
  .patch(verifyUser, markVerified);

export default router;
