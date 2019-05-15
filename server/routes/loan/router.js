import express from 'express';
import LoanController from '../../controllers/LoanController';
import LoanValidator from '../../middlewares/validators/LoanValidator';
import RepaymentController from '../../controllers/RepaymentController';
import RepaymentValidator from '../../middlewares/validators/RepaymentsValidator';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';

const router = express.Router();

const { validateLoanId, validateRepayment } = RepaymentValidator;
const {
  fineOne, applicationStatus, sortRepaidLoan, loanApplication
} = LoanController;
const { loanStatus, validateQueryParams, validateLoanApplication } = LoanValidator;
const { verifyToken } = Auth;
const { getRepayments, createRepayment } = RepaymentController;

router.route('/loans/:id/')
  .get(validateLoanId, fineOne)
  .patch(verifyToken, isAdmin, loanStatus, applicationStatus);
router.route('/loans')
  .get(validateQueryParams, sortRepaidLoan);
router.route('/loans/:id/repayments')
  .get(validateLoanId, getRepayments)
  .post(validateLoanId, validateRepayment, createRepayment);
router.route('/loans')
  .post(verifyToken, validateLoanApplication, loanApplication);

export default router;
