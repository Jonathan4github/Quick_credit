import express from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidator from '../middlewares/validators/AuthValidator';
import UserController from '../controllers/UserController';
import UserValidator from '../middlewares/validators/UserValidator';
import LoanController from '../controllers/LoanController';
import LoanValidator from '../middlewares/validators/LoanValidator';
import RepaymentController from '../controllers/RepaymentController';
import RepaymentValidator from '../middlewares/validators/RepaymentsValidator';


const router = express.Router();

router.route('/auth/signup/')
  .post(AuthValidator.Signup, AuthController.signup);
router.route('/auth/signin')
  .post(AuthValidator.Signin, AuthController.signin);
router.route('/users/:email/verify')
  .patch(UserValidator.verifyUser, UserController.markVerified);
router.route('/loans/:id/')
  .get(LoanController.fineOne);
router.route('/loans')
  .get(LoanValidator.validateQueryParams, LoanController.sortRepaidLoan)
router.route('/loans/:id/repayments')
  .get(RepaymentValidator.validateLoanId, RepaymentController.getRepayments);

export default router;