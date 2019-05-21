import express from 'express';
import RepaymentController from '../../controllers/RepaymentController';
import RepaymentValidator from '../../middlewares/validators/RepaymentsValidator';
import validateId from '../../middlewares/validators/validateId';

const router = express.Router();

const { validateRepayment, getRepaymentsValidator } = RepaymentValidator;
const { createRepayment, getRepayments } = RepaymentController;

router.route('/loans/:id/repayments')
  .post(validateId, validateRepayment, createRepayment)
  .get(validateId, getRepaymentsValidator, getRepayments);

export default router;
