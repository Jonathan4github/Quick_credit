import express from 'express';
import RepaymentController from '../../controllers/RepaymentController';
import RepaymentValidator from '../../middlewares/validators/RepaymentsValidator';

const router = express.Router();

const { validateLoanId, validateRepayment } = RepaymentValidator;
const { getRepayments, createRepayment } = RepaymentController;

router.route('/loans/:id/repayments')
  .get(validateLoanId, getRepayments)
  .post(validateLoanId, validateRepayment, createRepayment);

export default router;
