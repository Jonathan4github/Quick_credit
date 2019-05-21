import express from 'express';
import RepaymentController from '../../controllers/RepaymentController';
import RepaymentValidator from '../../middlewares/validators/RepaymentsValidator';
// import validateId from '../../middlewares/validators/validateId';

const router = express.Router();

router.route('/loans/:id/repayment')
  .post(RepaymentValidator.validateRepayment, RepaymentController.createRepayment);

export default router;
