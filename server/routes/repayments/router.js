import express from 'express';
import RepaymentController from '../../controllers/RepaymentController';
import RepaymentValidator from '../../middlewares/validators/RepaymentsValidator';
import validateId from '../../middlewares/validators/validateId';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';

const router = express.Router();

const { validateRepayment, getRepaymentsValidator } = RepaymentValidator;
const { createRepayment, getRepayments } = RepaymentController;

router.route('/loans/:id/repayments')
  .post(Auth.verifyToken, isAdmin, validateId, validateRepayment, createRepayment)
  .get(Auth.verifyToken, isAdmin, validateId, getRepaymentsValidator, getRepayments);

export default router;
